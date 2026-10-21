// Viewport animation manager:
// All scenes visible in the viewport animate simultaneously with NO artificial limit.
// Only when a scene scrolls completely off-screen does it pause on its current frame to conserve battery/RAM.

type ActiveCallback = (active: boolean) => void;

interface SceneEntry {
  id: string;
  element: HTMLElement;
  callback: ActiveCallback;
  isActive: boolean;
}

const entries = new Map<string, SceneEntry>();
let observer: IntersectionObserver | null = null;

function initObserver() {
  if (typeof window === "undefined" || observer) return;

  observer = new IntersectionObserver(
    (observerEntries) => {
      for (const obsEntry of observerEntries) {
        const id = (obsEntry.target as HTMLElement).dataset.sceneId;
        if (!id || !entries.has(id)) continue;

        const item = entries.get(id)!;
        const isVisible = obsEntry.isIntersecting;

        if (item.isActive !== isVisible) {
          item.isActive = isVisible;
          item.callback(isVisible);
        }
      }
    },
    {
      // Generous buffer margin so scenes are already actively running before reaching the edge
      rootMargin: "80px 0px 80px 0px",
      threshold: 0,
    }
  );
}

let nextId = 0;

export function registerScene(element: HTMLElement, onActiveChange: ActiveCallback): () => void {
  const id = `scene-${++nextId}`;
  element.dataset.sceneId = id;

  initObserver();

  const entry: SceneEntry = {
    id,
    element,
    callback: onActiveChange,
    isActive: false,
  };

  entries.set(id, entry);
  observer?.observe(element);

  return () => {
    observer?.unobserve(element);
    entries.delete(id);
  };
}

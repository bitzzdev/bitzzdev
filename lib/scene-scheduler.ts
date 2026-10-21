// Global animation scheduler to restrict active running scenes:
// Max 1 animating on mobile (screen <= 768px), max 2 on desktop.
type ActiveCallback = (active: boolean) => void;

interface SceneEntry {
  id: string;
  element: HTMLElement;
  visibleRatio: number;
  distanceFromCenter: number;
  inView: boolean;
  callback: ActiveCallback;
  isActive: boolean;
}

const entries = new Map<string, SceneEntry>();
let observer: IntersectionObserver | null = null;
let scrollListenerAttached = false;
let updateScheduled = false;

function getMaxActive(): number {
  if (typeof window === "undefined") return 1;
  return window.innerWidth <= 768 ? 1 : 2;
}

function updateActiveScenes() {
  updateScheduled = false;
  if (typeof window === "undefined") return;

  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;
  const maxActive = getMaxActive();

  // Calculate current viewport metrics for all registered entries
  const visibleEntries: SceneEntry[] = [];

  for (const entry of entries.values()) {
    if (!entry.inView) {
      if (entry.isActive) {
        entry.isActive = false;
        entry.callback(false);
      }
      continue;
    }

    const rect = entry.element.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    entry.distanceFromCenter = Math.abs(itemCenter - viewportCenter);

    const visibleHeight = Math.max(
      0,
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
    );
    entry.visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;

    visibleEntries.push(entry);
  }

  // Sort visible items by closest to center of viewport
  visibleEntries.sort((a, b) => a.distanceFromCenter - b.distanceFromCenter);

  // Top N (1 on phone, 2 on desktop) are active
  const activeSet = new Set<string>();
  for (let i = 0; i < Math.min(maxActive, visibleEntries.length); i++) {
    activeSet.add(visibleEntries[i].id);
  }

  // Update states
  for (const entry of entries.values()) {
    const shouldBeActive = activeSet.has(entry.id);
    if (entry.isActive !== shouldBeActive) {
      entry.isActive = shouldBeActive;
      entry.callback(shouldBeActive);
    }
  }
}

function scheduleUpdate() {
  if (updateScheduled) return;
  updateScheduled = true;
  requestAnimationFrame(updateActiveScenes);
}

function initListeners() {
  if (typeof window === "undefined") return;

  if (!observer) {
    observer = new IntersectionObserver(
      (observerEntries) => {
        for (const obsEntry of observerEntries) {
          const id = (obsEntry.target as HTMLElement).dataset.sceneId;
          if (id && entries.has(id)) {
            const item = entries.get(id)!;
            item.inView = obsEntry.isIntersecting;
          }
        }
        scheduleUpdate();
      },
      {
        rootMargin: "50px 0px 50px 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );
  }

  if (!scrollListenerAttached) {
    scrollListenerAttached = true;
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    document.addEventListener("visibilitychange", scheduleUpdate);
  }
}

let nextId = 0;

export function registerScene(element: HTMLElement, onActiveChange: ActiveCallback): () => void {
  const id = `scene-${++nextId}`;
  element.dataset.sceneId = id;

  initListeners();

  const entry: SceneEntry = {
    id,
    element,
    visibleRatio: 0,
    distanceFromCenter: Infinity,
    inView: false,
    callback: onActiveChange,
    isActive: false,
  };

  entries.set(id, entry);
  observer?.observe(element);
  scheduleUpdate();

  return () => {
    observer?.unobserve(element);
    entries.delete(id);
    scheduleUpdate();
  };
}

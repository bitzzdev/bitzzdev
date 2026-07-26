console.log('[bitz.dev] app.js loaded');

// ═══════════════════════════════════════════════════════════
// LENIS SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════
let lenis;

function initLenis() {
    if (typeof Lenis === 'undefined') {
        console.warn('[bitz.dev] Lenis not available, retrying...');
        return;
    }

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    console.log('[bitz.dev] Lenis initialized');
}

function waitForLenis() {
    if (typeof Lenis !== 'undefined') {
        initLenis();
    } else {
        setTimeout(waitForLenis, 200);
    }
}

// Retry for up to 5 seconds, then give up
const retryStart = Date.now();
const smartRetry = () => {
    if (typeof Lenis !== 'undefined') {
        initLenis();
    } else if (Date.now() - retryStart < 5000) {
        setTimeout(smartRetry, 200);
    } else {
        console.warn('[bitz.dev] Lenis did not load — smooth scroll disabled');
    }
};
smartRetry();

// ═══════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle?.addEventListener('click', () => { mobileMenu?.classList.add('open'); document.body.style.overflow = 'hidden'; lenis?.stop(); });
menuClose?.addEventListener('click', () => { mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); });
mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); });
});

// ═══════════════════════════════════════════════════════════
// ABOUT MODAL
// ═══════════════════════════════════════════════════════════
const aboutModal = document.getElementById('about-modal');
document.querySelectorAll('[data-open-about]').forEach(btn => {
    btn.addEventListener('click', () => { aboutModal?.classList.add('open'); document.body.style.overflow = 'hidden'; lenis?.stop(); });
});
document.querySelectorAll('[data-close-about]').forEach(btn => {
    btn.addEventListener('click', () => { aboutModal?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); });
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { aboutModal?.classList.remove('open'); mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; lenis?.start(); }
});

// ═══════════════════════════════════════════════════════════
// SCROLL TEXT — LINE-BY-LINE HIGHLIGHT
// ═══════════════════════════════════════════════════════════
function splitTextIntoLines() {
    document.querySelectorAll('[data-scroll-text]').forEach(container => {
        const text = container.textContent.trim();
        container.innerHTML = '';

        const sentences = text.split(/(?<=[.!?])\s+/);

        sentences.forEach((sentence, sentenceIdx) => {
            const words = sentence.split(/\s+/);
            let currentLine = [];

            words.forEach((word, wordIdx) => {
                currentLine.push(word);
                const isPause = /[.,;:!?]$/.test(word);
                const isLongEnough = currentLine.length >= 5;
                const isSentenceEnd = wordIdx === words.length - 1;

                if (isPause || isLongEnough || isSentenceEnd) {
                    const lineEl = document.createElement('span');
                    lineEl.classList.add('line');
                    lineEl.textContent = currentLine.join(' ') + ' ';
                    container.appendChild(lineEl);
                    currentLine = [];
                }
            });

            if (sentenceIdx < sentences.length - 1) {
                const spacer = document.createElement('span');
                spacer.innerHTML = '&nbsp;';
                container.appendChild(spacer);
            }
        });
    });
}

splitTextIntoLines();

function initScrollHighlight() {
    const scrollTexts = document.querySelectorAll('[data-scroll-text]');

    function updateLines() {
        const windowHeight = window.innerHeight;
        const viewportCenter = windowHeight / 2;

        scrollTexts.forEach(container => {
            const lines = container.querySelectorAll('.line');
            lines.forEach((line) => {
                const rect = line.getBoundingClientRect();
                const lineCenter = rect.top + rect.height / 2;
                const distance = Math.abs(lineCenter - viewportCenter) / (windowHeight / 2);

                let opacity;
                if (distance < 0.25) {
                    opacity = 1;
                } else if (distance < 0.9) {
                    opacity = 1 - ((distance - 0.25) / 0.65) * 0.9;
                } else {
                    opacity = 0.1;
                }
                line.style.color = `rgba(243, 242, 239, ${Math.max(0.1, Math.min(1, opacity))})`;
            });
        });
    }

    function scrollLoop() {
        updateLines();
        requestAnimationFrame(scrollLoop);
    }
    requestAnimationFrame(scrollLoop);

    window.addEventListener('scroll', updateLines, { passive: true });
    updateLines();
}

initScrollHighlight();

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════════════════════
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════════════════════════
// STAGGER ANIMATION
// ═══════════════════════════════════════════════════════════
const staggerItems = document.querySelectorAll('.work-item, .process-item, .metric-item');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), index * 100);
    });
}, { threshold: 0.1 });
staggerItems.forEach(item => { item.classList.add('reveal'); staggerObserver.observe(item); });

// ═══════════════════════════════════════════════════════════
// TESTIMONIALS SLIDER
// ═══════════════════════════════════════════════════════════
const testimonials = [
    { quote: "Bitupan's work was exceptional. He rewritten our entire web interface using custom-tailored elements. Our loading speeds went from 4.2 seconds to under 0.8 seconds, and organic checkouts spiked by 35% within the first month itself.", name: "Johnathan S.", role: "SaaS Founder, Austin TX", initials: "JS" },
    { quote: "The attention to detail is unmatched. Every pixel is in place, and the performance is breathtaking. He didn't just build a site; he built a conversion engine for our agency.", name: "Sarah Chen", role: "Creative Director, Tokyo", initials: "SC" },
    { quote: "Professional, transparent, and incredibly fast. Bitupan delivered a complex dashboard architecture in half the estimated time without compromising a single feature.", name: "Marcus Thorne", role: "CTO, FinTech Global", initials: "MT" }
];

const quoteEl = document.getElementById('testimonial-quote');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;

function updateSlider() {
    const t = testimonials[currentTestimonial];
    if (!quoteEl) return;
    quoteEl.style.opacity = '0';
    setTimeout(() => {
        quoteEl.innerHTML = `<p class="testimonial-quote">"${t.quote}"</p><div class="testimonial-author"><div class="testimonial-avatar">${t.initials}</div><div><div class="testimonial-name">${t.name}</div><div class="testimonial-role">${t.role}</div></div></div>`;
        quoteEl.style.opacity = '1';
    }, 300);
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentTestimonial));
}

prevBtn?.addEventListener('click', () => { currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length; updateSlider(); });
nextBtn?.addEventListener('click', () => { currentTestimonial = (currentTestimonial + 1) % testimonials.length; updateSlider(); });
dots.forEach(dot => { dot.addEventListener('click', () => { currentTestimonial = parseInt(dot.getAttribute('data-index')); updateSlider(); }); });
if (quoteEl) quoteEl.style.transition = 'opacity 0.3s';

// ═══════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const project = document.getElementById('form-project')?.value;
    const message = document.getElementById('form-message')?.value.trim();
    if (!name || !email || !message) { alert('Please fill out all mandatory fields.'); return; }
    const subject = encodeURIComponent(`New Project Inquiry: ${project}`);
    const body = encodeURIComponent(`Name: ${name}\n\nEmail: ${email}\n\nProject Type: ${project}\n\nMessage:\n${message}`);
    window.location.href = `mailto:bitupanborah1k@gmail.com?subject=${subject}&body=${body}`;
    if (formSuccess) { formSuccess.classList.add('visible'); contactForm.reset(); setTimeout(() => formSuccess.classList.remove('visible'), 5000); }
});

// ═══════════════════════════════════════════════════════════
// SMOOTH SCROLL FOR ANCHOR LINKS
// ═══════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
            else target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ═══════════════════════════════════════════════════════════
// COLOR BENDS — WEBGL
// ═══════════════════════════════════════════════════════════
function initColorBends(selector) {
  document.querySelectorAll(selector).forEach(container => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0';
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    const vertSrc = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const hexToRgb = hex => {
      let h = hex.replace('#', '').trim();
      if (h.length === 3) h = h.split('').map(c => c + c).join('');
      const num = parseInt(h.slice(0, 6), 16);
      return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
    };

    const ds = container.dataset;
    const rawColors = (ds.colors || '#A855F7').split(',').map(s => s.trim()).filter(Boolean);
    const parsedColors = rawColors.map(hexToRgb);
    const rotationDeg = parseFloat(ds.rotation) || 90;
    const speedVal = parseFloat(ds.speed) || 0.2;
    const scaleVal = parseFloat(ds.scale) || 1;
    const freqVal = parseFloat(ds.frequency) || 1;
    const warpVal = parseFloat(ds.warp) || 1;
    const intensityVal = parseFloat(ds.intensity) || 1.5;

    const fragSrc = `
      precision highp float;
      #define MAX_COLORS 8
      varying vec2 vUv;
      uniform vec2 uCanvas;
      uniform float uTime;
      uniform float uSpeed;
      uniform vec2 uRot;
      uniform int uColorCount;
      uniform vec3 uColors[MAX_COLORS];
      uniform int uTransparent;
      uniform float uScale;
      uniform float uFrequency;
      uniform float uWarpStrength;
      uniform vec2 uPointer;
      uniform float uMouseInfluence;
      uniform float uParallax;
      uniform float uNoise;
      uniform int uIterations;
      uniform float uIntensity;
      uniform float uBandWidth;

      void main() {
        float t = uTime * uSpeed;
        vec2 p = vUv * 2.0 - 1.0;
        p += uPointer * uParallax * 0.1;
        vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
        vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
        q /= max(uScale, 0.0001);
        q /= 0.5 + 0.2 * dot(q, q);
        q += 0.2 * cos(t) - 7.56;
        vec2 toward = (uPointer - rp);
        q += toward * uMouseInfluence * 0.2;

        for (int j = 0; j < 5; j++) {
          if (j >= uIterations - 1) break;
          vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
          q += (rr - q) * 0.15;
        }

        vec3 col = vec3(0.0);
        float a = 1.0;

        if (uColorCount > 0) {
          vec2 s = q;
          vec3 sumCol = vec3(0.0);
          float cover = 0.0;
          for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float m = mix(m0, m1, kMix);
            float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
            sumCol += uColors[i] * w;
            cover = max(cover, w);
          }
          col = clamp(sumCol, 0.0, 1.0);
          a = uTransparent > 0 ? cover : 1.0;
        } else {
          vec2 s = q;
          for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float m = mix(m0, m1, kMix);
            col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
          }
          a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
        }

        col *= uIntensity;

        if (uNoise > 0.0001) {
          float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
          col += (n - 0.5) * uNoise;
          col = clamp(col, 0.0, 1.0);
        }

        vec3 rgb = (uTransparent > 0) ? col * a : col;
        gl_FragColor = vec4(rgb, a);
      }
    `;

    function compile(s, t) {
      const sh = gl.createShader(t);
      gl.shaderSource(sh, s);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('CB shader err:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(vertSrc, gl.VERTEX_SHADER);
    const fs = compile(fragSrc, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('CB link err:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const positions = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);
    const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(prog, 'uv');
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const idxBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const colorsLoc = gl.getUniformLocation(prog, 'uColors');
    const u = {
      uCanvas: gl.getUniformLocation(prog, 'uCanvas'),
      uTime: gl.getUniformLocation(prog, 'uTime'),
      uSpeed: gl.getUniformLocation(prog, 'uSpeed'),
      uRot: gl.getUniformLocation(prog, 'uRot'),
      uColorCount: gl.getUniformLocation(prog, 'uColorCount'),
      uColors: colorsLoc,
      uTransparent: gl.getUniformLocation(prog, 'uTransparent'),
      uScale: gl.getUniformLocation(prog, 'uScale'),
      uFrequency: gl.getUniformLocation(prog, 'uFrequency'),
      uWarpStrength: gl.getUniformLocation(prog, 'uWarpStrength'),
      uPointer: gl.getUniformLocation(prog, 'uPointer'),
      uMouseInfluence: gl.getUniformLocation(prog, 'uMouseInfluence'),
      uParallax: gl.getUniformLocation(prog, 'uParallax'),
      uNoise: gl.getUniformLocation(prog, 'uNoise'),
      uIterations: gl.getUniformLocation(prog, 'uIterations'),
      uIntensity: gl.getUniformLocation(prog, 'uIntensity'),
      uBandWidth: gl.getUniformLocation(prog, 'uBandWidth'),
    };

    const colorData = new Float32Array(24);
    parsedColors.forEach((c, i) => {
      colorData[i * 3] = c[0];
      colorData[i * 3 + 1] = c[1];
      colorData[i * 3 + 2] = c[2];
    });

    gl.uniform1f(u.uSpeed, speedVal);
    gl.uniform2f(u.uRot, Math.cos(rotationDeg * Math.PI / 180), Math.sin(rotationDeg * Math.PI / 180));
    gl.uniform1i(u.uColorCount, parsedColors.length);
    gl.uniform3fv(u.uColors, colorData);
    gl.uniform1i(u.uTransparent, 0);
    gl.uniform1f(u.uScale, scaleVal);
    gl.uniform1f(u.uFrequency, freqVal);
    gl.uniform1f(u.uWarpStrength, warpVal);
    gl.uniform1f(u.uIntensity, intensityVal);
    gl.uniform2f(u.uPointer, 0, 0);
    gl.uniform1f(u.uMouseInfluence, 1);
    gl.uniform1f(u.uParallax, 0.5);
    gl.uniform1f(u.uNoise, 0.15);
    gl.uniform1i(u.uIterations, 1);
    gl.uniform1f(u.uBandWidth, 6);

    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.uCanvas, canvas.width, canvas.height);
    }

    let lastTime = 0;

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    canvas.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    });

    let animId;
    function loop(t) {
      const now = t * 0.001;
      const dt = now - lastTime;
      lastTime = now;

      gl.uniform1f(u.uTime, now);

      const smooth = 8;
      const amt = Math.min(1, dt * smooth);
      smoothPointer.x += (pointer.x - smoothPointer.x) * amt;
      smoothPointer.y += (pointer.y - smoothPointer.y) * amt;
      gl.uniform2f(u.uPointer, smoothPointer.x, smoothPointer.y);

      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);
  });
}

initColorBends('.color-bends');

// ═══════════════════════════════════════════════════════════
// SIDE RAYS — WEBGL
// ═══════════════════════════════════════════════════════════
function initSideRays() {
  const container = document.querySelector('.side-rays');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  container.appendChild(canvas);

  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
  if (!gl) return;

  const hexToRgb = hex => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
  };

  const vertSrc = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
  `;

  const fragSrc = `
    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform float iSpeed;
    uniform vec3 iRayColor1;
    uniform vec3 iRayColor2;
    uniform float iIntensity;
    uniform float iSpread;
    uniform float iFlipX;
    uniform float iFlipY;
    uniform float iTilt;
    uniform float iSaturation;
    uniform float iBlend;
    uniform float iFalloff;
    uniform float iOpacity;

    float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
      vec2 sourceToCoord = coord - raySource;
      float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
      return clamp(
        (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
        (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
        0.0, 1.0
      ) * clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
      if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

      vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
      vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

      float tiltRad = iTilt * 3.14159265 / 180.0;
      float cs = cos(tiltRad);
      float sn = sin(tiltRad);
      vec2 rel = coord - rayPos;
      vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

      float halfSpread = iSpread * 0.275;
      vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
      vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

      vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
      vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

      vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

      float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
      float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
      color.rgb *= brightness;

      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(vec3(gray), color.rgb, iSaturation);

      color.a = max(color.r, max(color.g, color.b)) * iOpacity;
      gl_FragColor = color;
    }
  `;

  function compileShader(src, type) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vertShader = compileShader(vertSrc, gl.VERTEX_SHADER);
  const fragShader = compileShader(fragSrc, gl.FRAGMENT_SHADER);
  if (!vertShader || !fragShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);

  const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {
    iTime: gl.getUniformLocation(program, 'iTime'),
    iResolution: gl.getUniformLocation(program, 'iResolution'),
    iSpeed: gl.getUniformLocation(program, 'iSpeed'),
    iRayColor1: gl.getUniformLocation(program, 'iRayColor1'),
    iRayColor2: gl.getUniformLocation(program, 'iRayColor2'),
    iIntensity: gl.getUniformLocation(program, 'iIntensity'),
    iSpread: gl.getUniformLocation(program, 'iSpread'),
    iFlipX: gl.getUniformLocation(program, 'iFlipX'),
    iFlipY: gl.getUniformLocation(program, 'iFlipY'),
    iTilt: gl.getUniformLocation(program, 'iTilt'),
    iSaturation: gl.getUniformLocation(program, 'iSaturation'),
    iBlend: gl.getUniformLocation(program, 'iBlend'),
    iFalloff: gl.getUniformLocation(program, 'iFalloff'),
    iOpacity: gl.getUniformLocation(program, 'iOpacity'),
  };

  const originToFlip = orig => {
    switch (orig) {
      case 'top-left': return [1, 0];
      case 'bottom-right': return [0, 1];
      case 'bottom-left': return [1, 1];
      default: return [0, 0];
    }
  };

  const [flipX, flipY] = originToFlip('top-right');
  const color1 = hexToRgb('#EAB308');
  const color2 = hexToRgb('#96c8ff');

  function updateSize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
  }

  gl.uniform1f(uniforms.iSpeed, 2.5);
  gl.uniform3f(uniforms.iRayColor1, color1[0], color1[1], color1[2]);
  gl.uniform3f(uniforms.iRayColor2, color2[0], color2[1], color2[2]);
  gl.uniform1f(uniforms.iIntensity, 2);
  gl.uniform1f(uniforms.iSpread, 2);
  gl.uniform1f(uniforms.iFlipX, flipX);
  gl.uniform1f(uniforms.iFlipY, flipY);
  gl.uniform1f(uniforms.iTilt, 0);
  gl.uniform1f(uniforms.iSaturation, 1.5);
  gl.uniform1f(uniforms.iBlend, 0.75);
  gl.uniform1f(uniforms.iFalloff, 1.6);
  gl.uniform1f(uniforms.iOpacity, 1.0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  updateSize();
  window.addEventListener('resize', updateSize);

  let animId;
  function loop(t) {
    gl.uniform1f(uniforms.iTime, t * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    animId = requestAnimationFrame(loop);
  }
  animId = requestAnimationFrame(loop);
}

initSideRays();

console.log('[bitz.dev] app.js ready');

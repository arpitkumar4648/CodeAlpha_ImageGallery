(function(){

  // ---- data ----
  const photos = [
    { id:1,  cat:'nature',   title:'Ridge Line at Dawn',     size:'tall', img:'https://picsum.photos/id/29/800/1067' },
    { id:2,  cat:'urban',    title:'Glass & Concrete',        size:'wide', img:'https://picsum.photos/id/164/1067/600' },
    { id:3,  cat:'portrait', title:'Quiet Study',             size:'reg',  img:'https://picsum.photos/id/1011/800/800' },
    { id:4,  cat:'abstract', title:'Folded Light',            size:'reg',  img:'https://picsum.photos/id/1062/800/800' },
    { id:5,  cat:'nature',   title:'Lowland Fog',             size:'reg',  img:'https://picsum.photos/id/15/800/800' },
    { id:6,  cat:'urban',    title:'Night Shift',             size:'tall', img:'https://picsum.photos/id/1048/800/1067' },
    { id:7,  cat:'portrait', title:'Half Profile',            size:'reg',  img:'https://picsum.photos/id/1027/800/800' },
    { id:8,  cat:'abstract', title:'Grain Study No. 3',       size:'reg',  img:'https://picsum.photos/id/1043/800/800' },
    { id:9,  cat:'nature',   title:'Coastal Drift',           size:'wide', img:'https://picsum.photos/id/1043/1067/600' },
    { id:10, cat:'urban',    title:'Stairwell',               size:'reg',  img:'https://picsum.photos/id/1067/800/800' },
    { id:11, cat:'portrait', title:'Window Light',            size:'tall', img:'https://picsum.photos/id/177/800/1067' },
    { id:12, cat:'abstract', title:'Negative Space',          size:'reg',  img:'https://picsum.photos/id/1080/800/800' },
    { id:13, cat:'nature',   title:'Treeline',                size:'reg',  img:'https://picsum.photos/id/1015/800/800' },
    { id:14, cat:'urban',    title:'Crosswalk',               size:'reg',  img:'https://picsum.photos/id/1024/800/800' },
    { id:15, cat:'portrait', title:'Backlit',                 size:'wide', img:'https://picsum.photos/id/1025/1067/600' },
    { id:16, cat:'abstract', title:'Static Field',            size:'reg',  img:'https://picsum.photos/id/1035/800/800' },
  ];

  const galleryEl = document.getElementById('gallery');
  const filterBar = document.getElementById('filterBar');

  function renderGallery(){
    galleryEl.innerHTML = photos.map((p, i) => `
      <figure class="frame ${p.size === 'wide' ? 'wide' : p.size === 'tall' ? 'tall' : ''}"
              data-cat="${p.cat}" data-index="${i}" style="animation-delay:${(i % 8) * 45}ms" tabindex="0" role="button"
              aria-label="Open ${p.title} in viewer">
        <span class="frame-id">F${String(p.id).padStart(2,'0')}</span>
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <figcaption class="frame-caption">
          <p class="title">${p.title}</p>
          <p class="category">${p.cat}</p>
        </figcaption>
      </figure>
    `).join('');
  }

  renderGallery();

  // ---- filtering ----
  let activeFilter = 'all';

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if(!btn) return;
    filterBar.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilter();
  });

  function applyFilter(){
    const frames = galleryEl.querySelectorAll('.frame');
    frames.forEach(f => {
      const match = activeFilter === 'all' || f.dataset.cat === activeFilter;
      f.classList.toggle('hidden', !match);
    });
  }

  // ---- lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbTitle = document.getElementById('lbTitle');
  const lbCurrent = document.getElementById('lbCurrent');
  const lbTotal = document.getElementById('lbTotal');
  const filmstrip = document.getElementById('filmstrip');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbClose = document.getElementById('lbClose');

  let currentList = photos;
  let currentPos = 0;

  function visiblePhotos(){
    return activeFilter === 'all' ? photos : photos.filter(p => p.cat === activeFilter);
  }

  function buildFilmstrip(){
    filmstrip.innerHTML = currentList.map((p, i) =>
      `<img src="${p.img}" alt="${p.title}" data-pos="${i}" class="${i === currentPos ? 'active' : ''}" />`
    ).join('');
  }

  function openLightbox(startPos){
    currentList = visiblePhotos();
    currentPos = startPos;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    showImage();
    buildFilmstrip();
  }

  function showImage(){
    const p = currentList[currentPos];
    lbImage.classList.remove('show');
    const next = new Image();
    next.onload = () => {
      lbImage.src = p.img;
      lbImage.alt = p.title;
      requestAnimationFrame(() => lbImage.classList.add('show'));
    };
    next.src = p.img;
    lbTitle.textContent = p.title;
    lbCurrent.textContent = String(currentPos + 1).padStart(2,'0');
    lbTotal.textContent = String(currentList.length).padStart(2,'0');

    filmstrip.querySelectorAll('img').forEach((img, i) => {
      img.classList.toggle('active', i === currentPos);
      if(i === currentPos) img.scrollIntoView({ block:'nearest', inline:'center', behavior:'smooth' });
    });
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function step(delta){
    currentPos = (currentPos + delta + currentList.length) % currentList.length;
    showImage();
  }

  galleryEl.addEventListener('click', (e) => {
    const frame = e.target.closest('.frame');
    if(!frame || frame.classList.contains('hidden')) return;
    const visList = visiblePhotos();
    const photoId = photos[Number(frame.dataset.index)].id;
    const pos = visList.findIndex(p => p.id === photoId);
    openLightbox(pos);
  });

  galleryEl.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      e.target.click();
    }
  });

  filmstrip.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if(!img) return;
    currentPos = Number(img.dataset.pos);
    showImage();
  });

  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));
  lbClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') step(-1);
    if(e.key === 'ArrowRight') step(1);
  });

  // basic swipe support for touch devices
  let touchStartX = null;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, {passive:true});
  lightbox.addEventListener('touchend', (e) => {
    if(touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(diff) > 50){ step(diff < 0 ? 1 : -1); }
    touchStartX = null;
  }, {passive:true});

})();
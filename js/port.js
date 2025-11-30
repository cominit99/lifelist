document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const nav = document.getElementById("nav");
    
    if (mobileMenu && nav) {
        mobileMenu.addEventListener("click", () => {
            nav.classList.toggle("active");
            mobileMenu.classList.toggle("active");
        });
    }
    
    const header = document.getElementById("head");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.style.background = "rgba(0, 0, 0, 0.95)";
            header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.background = "rgba(0, 0, 0, 0.9)";
            header.style.boxShadow = "none";
        }
    });

    // GitHub Pages 경로 자동 감지
    function getBasePath() {
        const currentURL = window.location.href;
        
        // GitHub Pages인지 확인
        if (currentURL.includes('github.io')) {
            // GitHub Pages URL에서 repository 이름 추출
            const urlParts = currentURL.split('/');
            // repository 이름이 있는 경우 (예: username.github.io/repo-name)
            if (urlParts.length > 3 && urlParts[3] && urlParts[3] !== '') {
                return `/${urlParts[3]}`;
            }
            // repository 이름이 없는 경우 (예: username.github.io)
            return '';
        } else {
            // 로컬 개발 환경
            return '';
        }
    }

    const basePath = getBasePath();
    console.log('Detected base path:', basePath);

    // port_iot 섹션 관련 기능
    function initPortIotSection() {
        const galleryGrid = document.getElementById("galleryGrid");
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        const imageCaption = document.getElementById("imageCaption");
        const closeModal = document.getElementById("closeModal");

        // 이미지 데이터 - basePath를 포함한 경로
        const imageData = [
    {
        src: `images/Port_ICT/image1.JPG`,
        caption: "작업 리스트"
    },
    {
        src: `images/Port_ICT/image2.JPG`,
        caption: "견적서"
    },
    {
        src: `images/Port_ICT/image3.JPG`,
        caption: "농장 전경"
    },
    {
        src: `images/Port_ICT/image4.JPG`,
        caption: "Control Diagram"
    },
    {
        src: `images/Port_ICT/image5.JPG`,
        caption: "CCTV Setup"
    },
    {
        src: `images/Port_ICT/image6.JPG`,
        caption: "Speaker Setup"
    },
    {
        src: `images/Port_ICT/image7.JPG`,
        caption: "ICT Setup(측/천창/FAN)"
    },
    {
        src: `images/Port_ICT/image8.JPG`,
        caption: "ICT Setup(양액펌프/센서)"
    },
    {
        src: `images/Port_ICT/image9.JPG`,
        caption: "농장 등기구"
    }
];

        // 갤러리 이미지 동적 생성
        function createGallery() {
            if (!galleryGrid) {
                console.error("galleryGrid 요소를 찾을 수 없습니다.");
                return;
            }
            
            console.log("갤러리 생성 시작...");
            console.log("Base path:", basePath);
            
            // 기존 내용 초기화
            galleryGrid.innerHTML = '';
            
            imageData.forEach((image, index) => {
                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item";
                galleryItem.setAttribute("data-index", index);
                
                const img = document.createElement("img");

                // ✅ 간단하게 상대 경로만 사용
                img.src = image.src;
                img.alt = image.caption;
                img.className = "gallery-img";
                img.loading = "lazy"; // 성능 최적화

                console.log(`이미지 경로: ${image.src}`);
                
                // 이미지 로드 상태 디버깅
                img.onload = function() {
                    console.log(`이미지 로드 성공: ${image.src}`);
                    galleryItem.classList.add('loaded');
                };
                
                img.onerror = function() {
                    console.error(`이미지 로드 실패: ${image.src}`);
                    this.style.display = 'none';
                    const placeholder = document.createElement("div");
                    placeholder.className = "placeholder-img";
                    placeholder.textContent = `이미지 ${index + 1}를 불러올 수 없습니다`;
                    placeholder.style.cssText = `
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f0f0f0;
                        color: #666;
                        font-weight: 500;
                        border-radius: 8px;
                        border: 2px dashed #ccc;
                    `;
                    galleryItem.appendChild(placeholder);
                };
                
                const overlay = document.createElement("div");
                overlay.className = "gallery-overlay";
                overlay.innerHTML = `<p>${image.caption}</p>`;
                
                galleryItem.appendChild(img);
                galleryItem.appendChild(overlay);
                galleryGrid.appendChild(galleryItem);
                
                // 클릭 이벤트 리스너 추가
                galleryItem.addEventListener("click", () => openModal(index));
            });
            
            console.log("갤러리 생성 완료");
        }

        // 모달 열기
        function openModal(index) {
            const image = imageData[index];
            console.log(`모달 열기: ${image.src}`);
            
            modalImage.src = image.src;
            modalImage.alt = image.caption;
            imageCaption.textContent = image.caption;
            
            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        }

        // 모달 닫기
        function closeModalHandler() {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }

        // 모달 외부 클릭 시 닫기
        function outsideClickHandler(e) {
            if (e.target === modal) {
                closeModalHandler();
            }
        }

        // 키보드 이벤트 (ESC 키로 모달 닫기)
        function keydownHandler(e) {
            if (e.key === "Escape" && modal.classList.contains("show")) {
                closeModalHandler();
            }
        }

        // 이벤트 리스너 등록
        if (closeModal) {
            closeModal.addEventListener("click", closeModalHandler);
        }
        
        if (modal) {
            modal.addEventListener("click", outsideClickHandler);
        }
        
        document.addEventListener("keydown", keydownHandler);

        // 갤러리 생성 실행
        createGallery();
    }
  

    // port_iot 섹션 초기화
    initPortIotSection();

    // Intersection Observer 설정
    const sections = document.querySelectorAll("section");
    
    const sectionObserverOptions = {
        threshold: 0.4,
        rootMargin: "0px"
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, sectionObserverOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 부드러운 스크롤 기능
    const headerOffset = 80;

    function smoothScroll(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // 네비게이션 링크 클릭 이벤트
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                let targetPosition;

                if (targetId === '#head') {
                    targetPosition = 0;
                } else {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    targetPosition = elementPosition + window.pageYOffset - headerOffset;
                }

                smoothScroll(targetPosition, 800);
                
                if (nav.classList.contains("active")) {
                    nav.classList.remove("active");
                    mobileMenu.classList.remove("active");
                }
            }
        });
    });

    // port_iot 섹션 초기화
    console.log("port_iot 섹션 초기화 시작...");
    initPortIotSection();
});

// 리사이즈 핸들러
let resizeTimer;
function handleResize() {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 250);
}
window.addEventListener('resize', handleResize);

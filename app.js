const circle = document.getElementById('circle');

// 동적 스타일을 위한 CSSOM 사용
const style = document.createElement('style');
document.head.appendChild(style);
const sheet = style.sheet;

// CSS 키프레임 애니메이션 추가
sheet.insertRule(
  `
      @keyframes rotateGradient {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  sheet.cssRules.length
);

sheet.insertRule(
  `
      @keyframes wave {
        0% {
          stroke-dasharray: 8 16;
          stroke-dashoffset: 0;
        }
        25% {
          stroke-dasharray: 12 24;
          stroke-dashoffset: -10;
        }
        50% {
          stroke-dasharray: 16 32;
          stroke-dashoffset: -20;
        }
        75% {
          stroke-dasharray: 12 24;
          stroke-dashoffset: -10;
        }
        100% {
          stroke-dasharray: 8 16;
          stroke-dashoffset: 0;
        }
      }
    `,
  sheet.cssRules.length
);

// 동적 CSS 스타일 적용
circle.style.position = 'relative';

const beforeStyle = document.createElement('style');
document.head.appendChild(beforeStyle);
const beforeSheet = beforeStyle.sheet;

beforeSheet.insertRule(
  `
      #circle::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border-radius: 50%;
        background: conic-gradient(from 0deg, rgb(255, 120, 120), rgb(255, 255, 115), rgb(163, 255, 163), rgb(143, 143, 255), rgb(255, 120, 255), rgb(255, 120, 120));
        animation: rotateGradient 5s linear infinite, wave 2s ease-in-out infinite;
        mask: radial-gradient(circle, rgb(0, 0, 0) 100%, transparent 0%);
        -webkit-mask: radial-gradient(circle, rgb(0, 0, 0) 0%, transparent 70%);
      }
    `,
  beforeSheet.cssRules.length
);

// 애니메이션 시작
circle.classList.add('animate');

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.navbar a');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // 기본 링크 동작 방지

      const targetId = e.target.getAttribute('href').substring(1); // href 속성에서 # 제거
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // 부드러운 스크롤
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');
  const content = document.querySelector('.content');

  // 3초 후 자동으로 전환
  setTimeout(() => {
    welcomeScreen.style.opacity = '0'; // 부드러운 전환 효과를 위한 opacity 변경
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      if (content) {
        // .content 요소가 존재할 경우에만 display 속성 변경
        content.style.display = 'block';
      }
    }, 1000); // opacity 전환 시간과 일치하도록 설정
  }, 300); // 3초 대기
});

document.addEventListener('scroll', () => {
  const circleContainer = document.querySelector('.circle-container');
  let scrollY = window.scrollY;

  // 섹션 위치 계산
  const mainSection = document.querySelector('#main');
  const projectsSection = document.querySelector('#projects');
  const contactSection = document.querySelector('#contact');
  const mainSectionTop = mainSection.offsetTop;
  const mainSectionHeight = mainSection.offsetHeight;
  const projectsSectionTop = projectsSection.offsetTop;
  const projectsSectionHeight = projectsSection.offsetHeight;
  const contactSectionTop = contactSection.offsetTop;

  // 섹션 끝 위치 계산
  const mainSectionBottom = mainSectionTop + mainSectionHeight;
  const projectsSectionBottom = projectsSectionTop + projectsSectionHeight;

  // 이동 거리 및 크기 조정 계산
  let moveDistance = scrollY * 0.6;
  const minSize = 1.0;
  const maxSize = 2.5;
  const scaleValue = Math.min(maxSize, minSize + scrollY * 0.004);

  // 최대 이동 거리를 제한
  if (moveDistance > 300) {
    moveDistance = 900;
  }

  if (scrollY < mainSectionTop) {
    // 'main' 섹션 전까지는 이동 및 크기 조정
    circleContainer.style.transform = `translate(calc(-50% - ${moveDistance}px), -50%) scale(${scaleValue})`;
  } else if (scrollY >= mainSectionTop && scrollY < mainSectionBottom) {
    // 'main' 섹션 동안 이동 및 크기 조정
    circleContainer.style.transform = `translate(calc(-50% - ${moveDistance}px), -50%) scale(${scaleValue})`;
  } else if (scrollY >= mainSectionBottom && scrollY < projectsSectionTop) {
    // 'main' 섹션 이후, 'projects' 섹션 전까지 크기 조정
    circleContainer.style.transform = `translate(calc(-50% - ${moveDistance}px), -50%) scale(${scaleValue})`;
  } else if (scrollY >= projectsSectionBottom && scrollY < contactSectionTop) {
    // 'projects' 섹션 이후, 'contact' 섹션 전까지의 크기 및 위치 조정
    circleContainer.style.transform = `translate(calc(-50% - ${moveDistance}px), -50%) scale(${scaleValue})`;
  } else {
    // 'contact' 섹션 이후에는 크기와 위치를 중앙으로 설정
    circleContainer.style.transform = `translate(-50%, -50%) scale(${maxSize})`;
  }
});


// 타이핑 애니메이션
const content1 = 'Hello World!';
const content2 = '나의 세상이 펼쳐지다';
const text = document.querySelector('#main-text');
let i = 0;
let isDeleting = false;
let isFirstContent = true;
const typingSpeed = 200; // 타이핑 속도 (밀리초)
const deletingSpeed = 50; // 삭제 속도 (밀리초)
const pauseBetween = 1000; // 타이핑과 삭제 사이의 일시정지 시간 (밀리초)
const pauseAfterTyping = 1000; // 타이핑 완료 후 일시정지 시간 (밀리초)

function type() {
  const currentContent = isFirstContent ? content1 : content2;
  if (i < currentContent.length && !isDeleting) {
    text.textContent += currentContent.charAt(i);
    i++;
    setTimeout(type, typingSpeed);
  } else if (i === currentContent.length && !isDeleting) {
    // 타이핑이 완료된 후 잠시 멈춤
    setTimeout(() => {
      isDeleting = true;
      setTimeout(type, deletingSpeed);
    }, pauseAfterTyping);
  } else if (isDeleting) {
    if (i > 0) {
      text.textContent = currentContent.substring(0, i - 1);
      i--;
      setTimeout(type, deletingSpeed);
    } else {
      // 삭제가 완료된 후 타이핑을 다시 시작
      isDeleting = false;
      isFirstContent = !isFirstContent; // 콘텐츠 변경
      setTimeout(type, pauseBetween);
    }
  }
}

// 애니메이션 시작
type();

function navigo() {
  const sections = document.querySelectorAll('.section'); // 모든 섹션 획득
  const navLinks = document.querySelectorAll('.nav-link'); // 모든 네비게이션 링크 획득

  document.addEventListener('scroll', onScroll, { passive: true }); // 스크롤 이벤트

  function onScroll() {
    const scrollPosition = window.pageYOffset; // 스크롤 위치

    // 현재 섹션에 따라 네비게이션 링크 색상 변경
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
      }
    });
  }
}

navigo();

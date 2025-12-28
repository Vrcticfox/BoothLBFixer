// ==UserScript==
// @name         Booth LineBreak Fixer
// @namespace    https://github.com/Vrcticfox/BoothLBFixer
// @version      0.1
// @description  linebreak fixer for better translation environment
// @author       Vrcticfox
// @match        https://booth.pm/*/items/*
// @match        https://*.booth.pm/items/*
// @match        https://*.booth.pm/*/items/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const fixLineBreaks = () => {
        // 찾을 요소. 모바일/PC 환경, 메인도메인/개인샵 서브도메인별로 위치가 다르기 때문.
        const descriptionTags = document.querySelectorAll('.description p, .description span, .shop__text p');

        descriptionTags.forEach(function (descriptionTag) {
            if (descriptionTag && !descriptionTag.dataset.brFixed) {
                descriptionTag.dataset.brFixed = "true";

                // 1. 기존 white-space 속성 변경
                descriptionTag.style.whiteSpace = 'normal';

                // 2. 내용을 \n 기준으로 나누고 각각을 <div>로 감쌈
                const lines = descriptionTag.innerHTML.split('\n');
                descriptionTag.innerHTML = lines.map(line => {
                    // 2-1. 빈 내용이면 높이 1em의 빈 <div> 박스로 대체
                    const trimmed = line.trim();
                    if (trimmed === '' || trimmed === '<br>') {
                        return '<div style="height: 1em;"></div>';
                    }
                    // 2-2. 내용이 있다면 나눈 문자열을 <div> 박스로 대체 및 속성지정.
                    return `<div style="display: block !important; margin-bottom: 2px;">${trimmed}</div>`;
                }).join('');
            }
        });

    };

    const observer = new MutationObserver(() => fixLineBreaks());
    observer.observe(document.body, { childList: true, subtree: true });

    fixLineBreaks();
})();

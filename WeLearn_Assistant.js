// ==UserScript==
// @name         Welearn助手
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      2.5.2
// @author       恶搞之家
// @description  自动选择Welearn平台的选择题、判断题、填空题和下拉框答案
// @match        *://welearn.sflep.com/Student/StudyCourse.aspx*
// @match        *://welearn.sflep.com/student/StudyCourse.aspx*
// @match        *://welearn.sflep.com/student/studyCourse.aspx*
// @match        *://welearn.sflep.com/student/Studycourse.aspx*
// @match        *://welearn.sflep.com/student/studycourse.aspx*
// @match        *://welearn.sflep.com/course/trycourse.aspx*
// @match        *://welearn.sflep.com/course/Trycourse.aspx*
// @match        *://welearn.sflep.com/course/TryCourse.aspx*
// @match        *://welearn.sflep.com/*/TryCourse.aspx*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
(function () {
    'use strict';


    const themePresets = {
        default: {
            name: '默认绿色',
            primaryColor: '#4CAF50',
            secondaryColor: '#45a049',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#e0e0e0',
            buttonColor: '#26a69a',
            buttonHoverColor: '#2ab7a9',
            accentColor: '#5c6bc0',
            borderColor: 'rgba(255, 255, 255, 0.12)'
        },
        pink: {
            name: '少女粉',
            primaryColor: '#FF69B4',
            secondaryColor: '#FF1493',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#FFB6C1',
            buttonColor: '#FF69B4',
            buttonHoverColor: '#FF1493',
            accentColor: '#DDA0DD',
            borderColor: 'rgba(255, 192, 203, 0.3)'
        },
        sakura: {
            name: '樱花粉',
            primaryColor: '#FFB7C5',
            secondaryColor: '#FF9EB5',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#FFE4E1',
            buttonColor: '#FF8DA1',
            buttonHoverColor: '#FF7B93',
            accentColor: '#FFB5C5',
            borderColor: 'rgba(255, 228, 225, 0.3)'
        },
        coral: {
            name: '珊瑚橙',
            primaryColor: '#FF7F50',
            secondaryColor: '#FF6347',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#FFA07A',
            buttonColor: '#FF8C69',
            buttonHoverColor: '#FF7256',
            accentColor: '#FA8072',
            borderColor: 'rgba(255, 160, 122, 0.3)'
        },
        blue: {
            name: '深邃蓝',
            primaryColor: '#1976D2',
            secondaryColor: '#1565C0',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#90CAF9',
            buttonColor: '#2196F3',
            buttonHoverColor: '#1976D2',
            accentColor: '#64B5F6',
            borderColor: 'rgba(144, 202, 249, 0.3)'
        },
        ocean: {
            name: '海洋蓝',
            primaryColor: '#00CED1',
            secondaryColor: '#20B2AA',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#E0FFFF',
            buttonColor: '#48D1CC',
            buttonHoverColor: '#40E0D0',
            accentColor: '#00CED1',
            borderColor: 'rgba(224, 255, 255, 0.3)'
        },
        purple: {
            name: '神秘紫',
            primaryColor: '#9C27B0',
            secondaryColor: '#7B1FA2',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#E1BEE7',
            buttonColor: '#BA68C8',
            buttonHoverColor: '#AB47BC',
            accentColor: '#9575CD',
            borderColor: 'rgba(225, 190, 231, 0.3)'
        },
        lavender: {
            name: '薰衣草',
            primaryColor: '#9B59B6',
            secondaryColor: '#8E44AD',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#D7BDE2',
            buttonColor: '#AF7AC5',
            buttonHoverColor: '#A569BD',
            accentColor: '#BB8FCE',
            borderColor: 'rgba(215, 189, 226, 0.3)'
        },
        mint: {
            name: '薄荷绿',
            primaryColor: '#00B894',
            secondaryColor: '#00A885',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#E0F2F1',
            buttonColor: '#1ABC9C',
            buttonHoverColor: '#16A085',
            accentColor: '#4DB6AC',
            borderColor: 'rgba(224, 242, 241, 0.3)'
        },
        gold: {
            name: '金色',
            primaryColor: '#F1C40F',
            secondaryColor: '#F39C12',
            backgroundColor: 'rgba(28, 32, 34, 0.92)',
            textColor: '#FFF3E0',
            buttonColor: '#FFB300',
            buttonHoverColor: '#FFA000',
            accentColor: '#FFD700',
            borderColor: 'rgba(255, 243, 224, 0.3)'
        },
        dark: {
            name: '暗夜黑',
            primaryColor: '#424242',
            secondaryColor: '#212121',
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            textColor: '#BDBDBD',
            buttonColor: '#616161',
            buttonHoverColor: '#757575',
            accentColor: '#9E9E9E',
            borderColor: 'rgba(189, 189, 189, 0.2)'
        }
    };


    let currentTheme = themePresets.default;


    function createThemePanel() {
        const themePanel = document.createElement('div');
        themePanel.id = 'welearnThemePanel';
        themePanel.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${currentTheme.backgroundColor};
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
      z-index: 10001;
      display: none;
      width: 300px;
      color: ${currentTheme.textColor};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    `;

        const title = document.createElement('h3');
        title.textContent = '主题选择';
        title.style.cssText = `
      margin: 0 0 20px 0;
      color: ${currentTheme.textColor};
      text-align: center;
      font-size: 18px;
    `;

        const themesContainer = document.createElement('div');
        themesContainer.style.cssText = `
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(2, 1fr);
    `;


        Object.entries(themePresets).forEach(([key, theme]) => {
            const themeButton = document.createElement('button');
            themeButton.textContent = theme.name;
            themeButton.style.cssText = `
        padding: 15px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        background: linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor});
        color: ${theme.textColor};
        position: relative;
        overflow: hidden;
      `;


            themeButton.addEventListener('mouseover', () => {
                themeButton.style.transform = 'scale(1.05)';
                themeButton.style.boxShadow = `0 4px 15px ${theme.primaryColor}40`;
            });

            themeButton.addEventListener('mouseout', () => {
                themeButton.style.transform = 'scale(1)';
                themeButton.style.boxShadow = 'none';
            });


            themeButton.addEventListener('click', () => {
                currentTheme = { ...theme };
                //GM_setValue('welearnTheme', currentTheme);
                updateUIColors();
                themePanel.style.display = 'none';
            });

            themesContainer.appendChild(themeButton);
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = '关闭';
        closeButton.style.cssText = `
      padding: 8px 16px;
      background: #666;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 20px;
      width: 100%;
    `;

        closeButton.addEventListener('click', () => {
            themePanel.style.display = 'none';
        });

        themePanel.appendChild(title);
        themePanel.appendChild(themesContainer);
        themePanel.appendChild(closeButton);

        return themePanel;
    }


    function updateUIColors() {
        const panel = document.getElementById('welearnHelperPanel');
        if (!panel) return;

        panel.style.background = currentTheme.backgroundColor;
        panel.style.color = currentTheme.textColor;
        panel.style.borderColor = currentTheme.borderColor;

        const titleBar = panel.querySelector('.welearn-title-bar');
        if (titleBar) {
            titleBar.style.background = `linear-gradient(135deg,
        ${currentTheme.primaryColor}15,
        ${currentTheme.secondaryColor}10,
        ${currentTheme.primaryColor}15)`;
        }

        const buttons = panel.querySelectorAll('.welearn-button');
        buttons.forEach(button => {
            if (button.classList.contains('welearn-auto-button')) {
                button.style.background = `linear-gradient(135deg, ${currentTheme.buttonColor} 0%, ${currentTheme.buttonHoverColor} 100%)`;
            } else if (button.classList.contains('welearn-loop-button')) {
                button.style.background = `linear-gradient(135deg, ${currentTheme.accentColor} 0%, ${adjustColor(currentTheme.accentColor, -20)} 100%)`;
            }
        });

        const containers = panel.querySelectorAll('.welearn-timer-container, .welearn-accuracy-container');
        containers.forEach(container => {
            container.style.borderColor = currentTheme.borderColor;
        });

        const inputs = panel.querySelectorAll('.welearn-time-input, .welearn-accuracy-input');
        inputs.forEach(input => {
            input.style.borderColor = currentTheme.borderColor;
            input.style.color = currentTheme.textColor;
        });
    }


    function adjustColor(color, amount) {
        return color.replace(/^#/, '').match(/.{2}/g).map(hex => {
            const num = Math.min(255, Math.max(0, parseInt(hex, 16) + amount));
            return num.toString(16).padStart(2, '0');
        }).join('');
    }


    function addThemeButton() {
        const panel = document.getElementById('welearnHelperPanel');
        if (!panel) return;

        const themeButton = document.createElement('button');
        themeButton.className = 'welearn-theme-button';
        themeButton.innerHTML = '🎨';
        themeButton.style.cssText = `
      position: absolute;
      top: 16px;
      right: 50px;
      background: none;
      border: none;
      color: ${currentTheme.textColor};
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      transition: all 0.3s ease;
    `;

        themeButton.addEventListener('mouseover', () => {
            themeButton.style.transform = 'rotate(180deg) scale(1.1)';
        });

        themeButton.addEventListener('mouseout', () => {
            themeButton.style.transform = 'none';
        });

        themeButton.addEventListener('click', () => {
            let themePanel = document.getElementById('welearnThemePanel');
            if (!themePanel) {
                themePanel = createThemePanel();
                document.body.appendChild(themePanel);
            }
            themePanel.style.display = themePanel.style.display === 'none' ? 'block' : 'none';
        });

        const titleBar = panel.querySelector('.welearn-title-bar');
        titleBar.appendChild(themeButton);
    }


    const originalCreateIntegratedUI = createIntegratedUI;
    createIntegratedUI = function () {
        const panel = originalCreateIntegratedUI();
        updateUIColors();
        return panel;
    };


    const originalAlert = window.alert;
    const originalConfirm = window.confirm;
    const originalPrompt = window.prompt;

    window.alert = function (message) {
        console.log('拦截到alert弹窗:', message);
        return true;
    };

    window.confirm = function (message) {
        console.log('拦截到confirm弹窗:', message);
        return true;
    };

    window.prompt = function (message, defaultValue) {
        console.log('拦截到prompt弹窗:', message);
        return defaultValue || '';
    };


    function handleIframeDialogs(iframe) {
        try {
            if (iframe.contentWindow) {
                iframe.contentWindow.alert = window.alert;
                iframe.contentWindow.confirm = window.confirm;
                iframe.contentWindow.prompt = window.prompt;
            }
        } catch (e) {
            console.log('处理iframe弹窗失败:', e);
        }
    }


    function setupIframeDialogHandlers() {
        const iframes = document.getElementsByTagName('iframe');
        for (const iframe of iframes) {
            iframe.addEventListener('load', () => {
                try {
                    handleIframeDialogs(iframe);
                } catch (error) {

                    if (error.name === 'SecurityError') {
                        console.log('允许iframe跨域错误:', error.message);
                    } else {
                        throw error;
                    }
                }
            });
            try {
                handleIframeDialogs(iframe);
            } catch (error) {

                if (error.name === 'SecurityError') {
                    console.log('允许iframe跨域错误:', error.message);
                } else {
                    throw error;
                }
            }
        }


        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.tagName === 'IFRAME') {
                        node.addEventListener('load', () => {
                            try {
                                handleIframeDialogs(node);
                            } catch (error) {

                                if (error.name === 'SecurityError') {
                                    console.log('允许iframe跨域错误:', error.message);
                                } else {
                                    throw error;
                                }
                            }
                        });
                        try {
                            handleIframeDialogs(node);
                        } catch (error) {

                            if (error.name === 'SecurityError') {
                                console.log('允许iframe跨域错误:', error.message);
                            } else {
                                throw error;
                            }
                        }
                    }
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }


    setupIframeDialogHandlers();


    const originalWindow = window;


    setInterval(() => {
        if (window.alert !== originalWindow.alert) {
            window.alert = originalWindow.alert;
        }
        if (window.confirm !== originalWindow.confirm) {
            window.confirm = originalWindow.confirm;
        }
        if (window.prompt !== originalWindow.prompt) {
            window.prompt = originalWindow.prompt;
        }

        const iframes = document.getElementsByTagName('iframe');
        for (const iframe of iframes) {
            handleIframeDialogs(iframe);
        }
    }, 1000);

    window.isAutoLoopActive = false;
    window.autoLoopTimeout = null;
    window.waitTimerActive = false;
    window.waitTimerInterval = null;
    window.defaultWaitTime = 30;
    window.defaultAccuracyRate = 100;
    window.autoNextEnabled = true;
    window.autoSubmitEnabled = true;

    const createEvent = (type, options = {}) => new Event(type, { bubbles: true, cancelable: true, ...options });
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function autoFillAnswers() {
        console.log('开始自动填空');
        let filled = false;


        const answerElements = document.querySelectorAll('span.key, div.key');
        const inputBoxes = document.querySelectorAll('span[autocapitalize="none"], textarea.blank');
        const dataInputs = document.querySelectorAll('input[data-itemtype="input"], textarea[data-itemtype="input"]');
        const textareaInputs = document.querySelectorAll('textarea[data-itemtype="textarea"]');
        const editableSpans = document.querySelectorAll('span[contenteditable][ng-class*="blank.isOverflowed"]');

        const totalInputs = inputBoxes.length + dataInputs.length + textareaInputs.length + editableSpans.length;
        console.log('找到填空题数量:', totalInputs);


        let correctCount, wrongCount;
        let wrongIndices = new Set();

        if (totalInputs > 5) {
            correctCount = Math.ceil((totalInputs * window.defaultAccuracyRate) / 100);
            wrongCount = totalInputs - correctCount;
            console.log(`总题目: ${totalInputs}, 正确数: ${correctCount}, 错误数: ${wrongCount}`);


            while (wrongIndices.size < wrongCount) {
                const randomIndex = Math.floor(Math.random() * totalInputs);
                wrongIndices.add(randomIndex);
            }
        }


        let currentIndex = 0;
        if (inputBoxes.length > 0) {
            for (let index = 0; index < answerElements.length; index++) {
                try {
                    const answer = answerElements[index].textContent;
                    const inputBox = inputBoxes[index];
                    if (!inputBox) continue;

                    let finalAnswer;
                    if (totalInputs > 5 && wrongIndices.has(currentIndex)) {
                        finalAnswer = answer + String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        console.log(`准备填写第${currentIndex + 1}题错误答案:`, finalAnswer);
                    } else {
                        finalAnswer = answer;
                        console.log(`准备填写第${currentIndex + 1}题正确答案:`, finalAnswer);
                    }


                    if (inputBox.tagName === 'SPAN') {
                        inputBox.textContent = finalAnswer;
                    } else {
                        inputBox.value = finalAnswer;
                    }


                    ['click', 'focus', 'input', 'change', 'blur'].forEach(evt =>
                        inputBox.dispatchEvent(createEvent(evt))
                    );

                    filled = true;
                    await sleep(200);
                    currentIndex++;
                } catch (error) {
                    console.log(`填写第${currentIndex + 1}题出错:`, error);
                }
            }
        }


        if (dataInputs.length > 0) {
            for (let i = 0; i < dataInputs.length; i++) {
                try {
                    const input = dataInputs[i];
                    let answer = input.getAttribute('data-solution');


                    if (!answer) {
                        const parentDiv = input.closest('div');
                        if (parentDiv) {
                            const resultDiv = parentDiv.querySelector('div[data-itemtype="result"]');
                            if (resultDiv) {
                                answer = resultDiv.textContent.trim();
                            }
                        }
                    }

                    if (!answer) continue;

                    let finalAnswer;
                    if (totalInputs > 5 && wrongIndices.has(currentIndex)) {
                        finalAnswer = answer + String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        console.log(`准备填写第${currentIndex + 1}题错误答案:`, finalAnswer);
                    } else {
                        finalAnswer = answer;
                        console.log(`准备填写第${currentIndex + 1}题正确答案:`, finalAnswer);
                    }


                    if (input.tagName === 'INPUT') {
                        input.value = finalAnswer;
                    } else {
                        input.textContent = finalAnswer;
                    }


                    ['click', 'focus', 'input', 'change', 'blur'].forEach(evt =>
                        input.dispatchEvent(createEvent(evt))
                    );

                    filled = true;
                    await sleep(200);
                    currentIndex++;
                } catch (error) {
                    console.log(`处理data-solution题目出错:`, error);
                }
            }
        }


        if (textareaInputs.length > 0) {
            for (let i = 0; i < textareaInputs.length; i++) {
                try {
                    const textarea = textareaInputs[i];
                    let answer = textarea.getAttribute('data-solution');


                    if (!answer) {
                        const parentDiv = textarea.closest('div');
                        if (parentDiv) {
                            const resultDiv = parentDiv.querySelector('div[data-itemtype="result"]');
                            if (resultDiv) {
                                answer = resultDiv.textContent.trim();
                            }
                        }
                    }

                    if (!answer) continue;

                    let finalAnswer;
                    if (totalInputs > 5 && wrongIndices.has(currentIndex)) {
                        finalAnswer = answer + String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        console.log(`准备填写第${currentIndex + 1}题错误答案:`, finalAnswer);
                    } else {
                        finalAnswer = answer;
                        console.log(`准备填写第${currentIndex + 1}题正确答案:`, finalAnswer);
                    }


                    textarea.value = finalAnswer;


                    ['click', 'focus', 'input', 'change', 'blur'].forEach(evt =>
                        textarea.dispatchEvent(createEvent(evt))
                    );


                    if (textarea.style.height) {
                        const computedStyle = window.getComputedStyle(textarea);
                        const height = computedStyle.height;
                        textarea.style.height = height;
                    }

                    filled = true;
                    await sleep(200);
                    currentIndex++;
                } catch (error) {
                    console.log(`处理textarea题目出错:`, error);
                }
            }
        }


        if (editableSpans.length > 0) {
            for (let i = 0; i < editableSpans.length; i++) {
                try {
                    const span = editableSpans[i];

                    const answerSpan = span.nextElementSibling?.querySelector('span.key[ng-if="blank.hasKey"]') ||
                        span.parentElement?.querySelector('span.key[ng-if="blank.hasKey"]');

                    if (!answerSpan) continue;

                    let answer = answerSpan.textContent.trim();
                    if (!answer) continue;

                    let finalAnswer;
                    if (totalInputs > 5 && wrongIndices.has(currentIndex)) {
                        finalAnswer = answer + String.fromCharCode(65 + Math.floor(Math.random() * 26));
                        console.log(`准备填写第${currentIndex + 1}题错误答案:`, finalAnswer);
                    } else {
                        finalAnswer = answer;
                        console.log(`准备填写第${currentIndex + 1}题正确答案:`, finalAnswer);
                    }


                    span.textContent = finalAnswer;


                    ['click', 'focus', 'input', 'change', 'blur'].forEach(evt =>
                        span.dispatchEvent(createEvent(evt))
                    );


                    if (typeof angular !== 'undefined') {
                        try {
                            const scope = angular.element(span).scope();
                            if (scope && scope.blank) {
                                scope.blank.value = finalAnswer;
                                scope.$apply();
                            }
                        } catch (e) {
                            console.log('Angular数据绑定更新失败:', e);
                        }
                    }

                    filled = true;
                    await sleep(200);
                    currentIndex++;
                } catch (error) {
                    console.log(`处理contenteditable span题目出错:`, error);
                }
            }
        }


        await sleep(500);


        console.log('开始对每个填空框进行点击操作');

        const allInputs = [...inputBoxes, ...dataInputs, ...textareaInputs, ...editableSpans];
        allInputs.forEach((inputBox, index) => {
            try {
                if (!document.body.contains(inputBox)) return;

                console.log(`对第${index + 1}个填空框进行点击操作`);


                inputBox.dispatchEvent(createEvent('click'));
                inputBox.dispatchEvent(createEvent('focus'));

                setTimeout(() => {
                    inputBox.dispatchEvent(createEvent('blur'));
                }, 50);
            } catch (error) {
                console.log(`额外点击第${index + 1}个填空框出错:`, error);
            }
        });

        console.log('填空题处理完成');
        return filled;
    }


    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    async function handleUnitTestAnswers() {
        console.log('开始处理单元测试题目');
        let answered = false;

        try {

            const resultSpans = document.querySelectorAll('span.unittestresult');
            if (resultSpans.length > 0) {
                console.log('找到单元测试题目数量:', resultSpans.length);


                const totalQuestions = resultSpans.length;
                const correctCount = Math.ceil((totalQuestions * window.defaultAccuracyRate) / 100);
                const wrongCount = totalQuestions - correctCount;
                console.log(`总题目: ${totalQuestions}, 正确数: ${correctCount}, 错误数: ${wrongCount}`);


                const wrongIndices = new Set();
                while (wrongIndices.size < wrongCount) {
                    const randomIndex = Math.floor(Math.random() * totalQuestions);
                    wrongIndices.add(randomIndex);
                }


                let currentIndex = 0;
                for (const span of resultSpans) {
                    try {

                        const resultDiv = span.querySelector('div[data-itemtype="result"]');
                        if (!resultDiv) continue;

                        const answer = resultDiv.textContent.trim();
                        console.log('找到答案:', answer);


                        const questionText = span.closest('div[data-controltype="filling"]')?.querySelector('span[data-itemtype="sn"]')?.textContent.trim();
                        if (!questionText) continue;


                        const answerSheets = document.querySelectorAll('div.AnswerSheet');
                        for (const sheet of answerSheets) {
                            const sheetTitle = sheet.querySelector('h6.unit_test_answersheet_tit')?.textContent.trim();
                            if (sheetTitle && sheetTitle.includes(questionText)) {

                                const options = Array.from(sheet.querySelectorAll('ul.AnswerSheet_chooseBox li h5'));

                                if (wrongIndices.has(currentIndex)) {

                                    const wrongOptions = options.filter(opt => opt.textContent.trim() !== answer);
                                    if (wrongOptions.length > 0) {
                                        const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
                                        randomWrongOption.click();
                                        console.log(`第${currentIndex + 1}题选择错误答案: ${randomWrongOption.textContent.trim()}`);
                                    } else {

                                        const correctOption = options.find(opt => opt.textContent.trim() === answer);
                                        if (correctOption) {
                                            correctOption.click();
                                            console.log(`第${currentIndex + 1}题未找到错误选项，选择正确答案: ${answer}`);
                                        }
                                    }
                                } else {

                                    const correctOption = options.find(opt => opt.textContent.trim() === answer);
                                    if (correctOption) {
                                        correctOption.click();
                                        console.log(`第${currentIndex + 1}题选择正确答案: ${answer}`);
                                    }
                                }
                                answered = true;
                                await sleep(300);
                                break;
                            }
                        }
                        currentIndex++;
                    } catch (error) {
                        console.log('处理单个题目时出错:', error);
                    }
                }
            }
        } catch (error) {
            console.log('处理单元测试题目出错:', error);
        }

        return answered;
    }

    async function autoSelectCorrectAnswers() {
        console.log('开始自动选择答案');

        let allQuestions = [];
        let answered = false;


        const choiceQuestions = document.querySelectorAll('et-choice[et-index]');
        const tfQuestions = document.querySelectorAll('et-tof[et-index]');
        const newChoiceQuestions = document.querySelectorAll('div[data-controltype="choice"]');
        allQuestions = [...choiceQuestions, ...tfQuestions, ...newChoiceQuestions];

        const totalQuestions = allQuestions.length;
        console.log('找到选择/判断题数量:', totalQuestions);

        if (totalQuestions <= 5) {

            for (const question of allQuestions) {
                await handleQuestion(question, true);
            }
        } else {

            const correctCount = Math.ceil((totalQuestions * window.defaultAccuracyRate) / 100);
            const wrongCount = totalQuestions - correctCount;
            console.log(`总题目: ${totalQuestions}, 正确数: ${correctCount}, 错误数: ${wrongCount}`);


            const wrongIndices = new Set();
            while (wrongIndices.size < wrongCount) {
                const randomIndex = Math.floor(Math.random() * totalQuestions);
                wrongIndices.add(randomIndex);
            }


            for (let i = 0; i < allQuestions.length; i++) {
                const question = allQuestions[i];
                const shouldBeCorrect = !wrongIndices.has(i);
                await handleQuestion(question, shouldBeCorrect);
                await sleep(300);
            }
        }

        console.log('选择/判断题处理完成');
    }


    async function handleQuestion(question, shouldBeCorrect) {
        const questionType = question.tagName.toLowerCase() === 'et-tof' ? 'tof' :
            question.hasAttribute('data-controltype') ? 'new-choice' : 'choice';
        let options = [];


        if (questionType === 'tof') {
            options = question.querySelectorAll('span[ng-class*="chosen:tof.value"], div.wrapper span');
        } else if (questionType === 'new-choice') {

            const optionsList = question.querySelector('ul[data-itemtype="options"]');
            if (optionsList) {
                options = Array.from(optionsList.querySelectorAll('li'));


                const correctOption = optionsList.querySelector('li[data-solution]');
                if (correctOption && shouldBeCorrect) {
                    try {
                        correctOption.click();
                        console.log('找到并选择了正确答案:', correctOption.textContent.trim());
                        await sleep(300);
                        return;
                    } catch (error) {
                        console.log('点击正确选项出错:', error);
                    }
                } else if (!shouldBeCorrect && options.length > 0) {

                    const wrongOptions = Array.from(options).filter(opt => opt !== correctOption);
                    if (wrongOptions.length > 0) {
                        const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
                        try {
                            randomWrongOption.click();
                            console.log('已选择错误答案:', randomWrongOption.textContent.trim());
                            await sleep(300);
                            return;
                        } catch (error) {
                            console.log('选择错误答案时出错:', error);
                        }
                    }
                }
            }
        } else {
            options = question.querySelectorAll('ol > li, div.wrapper li, span[ng-click*="choice.select"], li[class]');
        }

        if (options.length === 0) {
            console.log('未找到选项，跳过');
            return;
        }

        if (shouldBeCorrect) {

            for (const option of options) {
                try {
                    option.click();
                    await sleep(300);

                    const wrapper = questionType === 'tof'
                        ? option.closest('div[ng-class*="isKeyVisible"]')
                        : option.closest('div.wrapper');

                    if (wrapper?.classList.contains('correct')) {
                        console.log('找到并选择了正确答案:', option.textContent.trim());
                        break;
                    }
                } catch (error) {
                    console.log('点击选项出错:', error);
                }
            }
        } else {

            let correctOption = null;


            for (const option of options) {
                try {
                    option.click();
                    await sleep(300);

                    const wrapper = questionType === 'tof'
                        ? option.closest('div[ng-class*="isKeyVisible"]')
                        : option.closest('div.wrapper');

                    if (wrapper?.classList.contains('correct')) {
                        correctOption = option;
                        break;
                    }
                } catch (error) {
                    console.log('查找正确答案时出错:', error);
                }
            }


            if (correctOption) {
                const wrongOptions = Array.from(options).filter(opt => opt !== correctOption);
                if (wrongOptions.length > 0) {
                    const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
                    try {
                        randomWrongOption.click();
                        console.log('已选择错误答案:', randomWrongOption.textContent.trim());
                    } catch (error) {
                        console.log('选择错误答案时出错:', error);
                    }
                }
            }
        }

        await sleep(300);
    }

    function autoSelectDropdownAnswers() {
        console.log('开始处理下拉框选择题');

        const dropdowns = document.querySelectorAll('select[ng-model]');
        console.log('找到下拉框数量:', dropdowns.length);

        if (dropdowns.length === 0) return;

        dropdowns.forEach((dropdown, index) => {
            try {
                const correctOption = dropdown.querySelector('option.key');
                if (!correctOption) return;


                dropdown.value = correctOption.value;
                dropdown.dispatchEvent(createEvent('change'));

                console.log(`已选择第${index + 1}个下拉框答案:`, correctOption.textContent.trim());
            } catch (error) {
                console.log(`处理第${index + 1}个下拉框出错:`, error);
            }
        });
    }

    async function autoMatchLines() {
        console.log('开始处理连线题');


        const matchingElements = document.querySelectorAll('et-matching[et-index]');
        if (matchingElements.length === 0) return;

        console.log(`找到连线题数量: ${matchingElements.length}`);


        for (const matchingElement of matchingElements) {
            const matchingKey = matchingElement.getAttribute('key');
            if (!matchingKey) continue;

            console.log(`处理连线题，答案key: ${matchingKey}`);

            try {

                const pairs = matchingKey.split(',').map(pair => {
                    const [left, right] = pair.split('-');
                    return {
                        leftIndex: parseInt(left) - 1,
                        rightIndex: parseInt(right) - 1
                    };
                });


                let angularSuccess = false;

                if (typeof angular !== 'undefined') {
                    try {
                        const scope = angular.element(matchingElement).scope();
                        if (scope?.matching) {

                            if (Array.isArray(scope.matching.lines)) {
                                scope.matching.lines = [];
                            }


                            for (const { leftIndex, rightIndex } of pairs) {
                                const leftCircle = scope.matching.circles?.A?.[leftIndex];
                                const rightCircle = scope.matching.circles?.B?.[rightIndex];

                                if (!leftCircle || !rightCircle) continue;


                                if (typeof leftCircle.select === 'function') {
                                    leftCircle.select();
                                    await sleep(200);
                                    rightCircle.select?.();
                                } else if (typeof scope.matching.connect === 'function') {
                                    scope.matching.connect(leftCircle, rightCircle);
                                } else if (Array.isArray(scope.matching.lines)) {
                                    scope.matching.lines.push({
                                        x1: leftCircle.x,
                                        y1: leftCircle.y,
                                        x2: rightCircle.x,
                                        y2: rightCircle.y,
                                        circleA: leftCircle,
                                        circleB: rightCircle
                                    });
                                }

                                await sleep(200);
                            }


                            scope.$apply?.();
                            await sleep(500);

                            if (Array.isArray(scope.matching.lines) && scope.matching.lines.length > 0) {
                                angularSuccess = true;
                            }
                        }
                    } catch (e) {
                        console.error('Angular模型操作失败:', e);
                    }
                }


                if (angularSuccess) continue;


                console.log('尝试DOM操作方式');


                let leftCircles = [];
                let rightCircles = [];


                leftCircles = Array.from(matchingElement.querySelectorAll('circle[data-circle="A"]'));
                rightCircles = Array.from(matchingElement.querySelectorAll('circle[data-circle="B"]'));


                if (leftCircles.length === 0 || rightCircles.length === 0) {
                    const allCircles = matchingElement.querySelectorAll('circle[ng-repeat]');
                    leftCircles = [];
                    rightCircles = [];

                    for (const circle of allCircles) {
                        const ngRepeat = circle.getAttribute('ng-repeat');
                        if (ngRepeat?.includes('matching.circles.A')) {
                            leftCircles.push(circle);
                        } else if (ngRepeat?.includes('matching.circles.B')) {
                            rightCircles.push(circle);
                        }
                    }
                }


                if (leftCircles.length === 0 || rightCircles.length === 0) {
                    const allCircles = matchingElement.querySelectorAll('circle');

                    if (allCircles.length > 1) {

                        const circlesWithCoords = Array.from(allCircles)
                            .map(circle => ({
                                element: circle,
                                x: parseFloat(circle.getAttribute('cx')),
                                y: parseFloat(circle.getAttribute('cy'))
                            }))
                            .filter(c => !isNaN(c.x) && !isNaN(c.y));

                        if (circlesWithCoords.length > 1) {
                            circlesWithCoords.sort((a, b) => a.x - b.x);
                            const midX = (circlesWithCoords[0].x + circlesWithCoords[circlesWithCoords.length - 1].x) / 2;

                            leftCircles = circlesWithCoords.filter(c => c.x < midX).map(c => c.element);
                            rightCircles = circlesWithCoords.filter(c => c.x >= midX).map(c => c.element);
                        }
                    }
                }

                if (leftCircles.length === 0 || rightCircles.length === 0) continue;


                for (const { leftIndex, rightIndex } of pairs) {
                    if (leftIndex < 0 || leftIndex >= leftCircles.length ||
                        rightIndex < 0 || rightIndex >= rightCircles.length) continue;

                    const leftCircle = leftCircles[leftIndex];
                    const rightCircle = rightCircles[rightIndex];


                    const leftX = parseFloat(leftCircle.getAttribute('cx'));
                    const leftY = parseFloat(leftCircle.getAttribute('cy'));
                    const rightX = parseFloat(rightCircle.getAttribute('cx'));
                    const rightY = parseFloat(rightCircle.getAttribute('cy'));

                    try {

                        const createMouseEvent = (type, x, y) => new MouseEvent(type, {
                            bubbles: true, cancelable: true, view: window,
                            clientX: x, clientY: y
                        });

                        ['mousedown', 'click'].forEach(type =>
                            leftCircle.dispatchEvent(createMouseEvent(type, leftX, leftY)));

                        await sleep(300);


                        ['mousedown', 'click'].forEach(type =>
                            rightCircle.dispatchEvent(createMouseEvent(type, rightX, rightY)));

                        await sleep(300);


                        if (typeof angular !== 'undefined') {
                            const scope = angular.element(leftCircle).scope();
                            scope?.$apply?.();


                            if (element.tagName === 'circle' && element.hasAttribute('data-index')) {
                                const dataIndex = element.getAttribute('data-index');
                                const dataCircle = element.getAttribute('data-circle');
                                const matchingElement = element.closest('et-matching[et-index]');

                                if (matchingElement && dataCircle) {
                                    const matchingScope = angular.element(matchingElement).scope();
                                    const circles = matchingScope?.matching?.circles?.[dataCircle];
                                    const circle = circles?.[dataIndex];

                                    if (circle?.select) {
                                        circle.select();
                                        matchingScope.$apply?.();
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.error('点击圆圈出错:', e);
                    }
                }
            } catch (error) {
                console.error(`处理连线题出错:`, error);
            }


            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('所有连线题处理完成');
    }

    function isElementVisible(element) {
        if (!element) return false;

        try {
            const style = window.getComputedStyle(element);
            return style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                element.offsetParent !== null;
        } catch (e) {
            return true;
        }
    }

    async function clickElement(element) {
        if (!element) return;

        try {

            element.click();
            await sleep(100);


            const cx = parseFloat(element.getAttribute('cx')) || 0;
            const cy = parseFloat(element.getAttribute('cy')) || 0;

            const mouseEventOptions = {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: cx,
                clientY: cy
            };

            ['mousedown', 'mouseup', 'click'].forEach(type =>
                element.dispatchEvent(new MouseEvent(type, mouseEventOptions)));


            if (typeof angular !== 'undefined') {
                const scope = angular.element(element).scope();
                scope?.$apply?.();


                if (element.tagName === 'circle' && element.hasAttribute('data-index')) {
                    const dataIndex = element.getAttribute('data-index');
                    const dataCircle = element.getAttribute('data-circle');
                    const matchingElement = element.closest('et-matching[et-index]');

                    if (matchingElement && dataCircle) {
                        const matchingScope = angular.element(matchingElement).scope();
                        const circles = matchingScope?.matching?.circles?.[dataCircle];
                        const circle = circles?.[dataIndex];

                        if (circle?.select) {
                            circle.select();
                            matchingScope.$apply?.();
                        }
                    }
                }
            }
        } catch (error) {
            console.error('点击元素出错:', error);
        }
    }

    async function submitAnswers() {
        if (!window.autoSubmitEnabled) {
            console.log('自动提交已禁用，跳过提交');
            return false;
        }

        console.log('准备提交答案');
        let submitted = false;
        let maxAttempts = 3;
        let attemptCount = 0;

        await sleep(2000);

        while (!submitted && attemptCount < maxAttempts) {
            attemptCount++;
            console.log(`尝试提交答案 (第${attemptCount}次)`);

            try {

                let submitButton = null;


                submitButton = Array.from(document.querySelectorAll('button')).find(btn =>
                    (btn.textContent.trim() === 'Submit' ||
                        btn.querySelector('span')?.textContent.trim() === 'Submit') &&
                    !btn.disabled && btn.offsetParent !== null
                );


                if (!submitButton) {
                    const etButtons = document.querySelectorAll('et-button[right][action="item.submit()"]');
                    for (const etBtn of etButtons) {
                        const btn = etBtn.querySelector('button[ng-click="btn.doAction()"]');
                        if (btn && !btn.disabled && btn.offsetParent !== null) {
                            submitButton = btn;
                            break;
                        }
                    }
                }


                if (!submitButton) {
                    submitButton = document.querySelector('button[ng-click*="submit"], button[ng-click*="btn.doAction()"]');
                }

                if (submitButton) {
                    console.log('找到Submit按钮，尝试点击');
                    submitButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    await sleep(500);

                    submitButton.click();
                    await sleep(500);


                    if (typeof angular !== 'undefined') {
                        const scope = angular.element(submitButton).scope();
                        if (scope?.item?.submit) {
                            scope.item.submit();
                            scope.$apply();
                        }
                    }

                    submitted = true;
                    await sleep(2000);
                } else {
                    console.log('未找到Submit按钮，尝试其他方式');

                    const submitLink = document.querySelector('a[data-controltype="submit"]');
                    if (submitLink) {
                        submitLink.click();
                        await sleep(2000);
                        submitted = true;
                    }
                }


                if (submitted) {
                    console.log('提交成功，检查确认框');

                    for (let i = 0; i < 5; i++) {
                        const confirmButton = document.querySelector('a.layui-layer-btn0');
                        if (confirmButton) {
                            console.log('找到确认按钮，点击确认');
                            confirmButton.click();
                            await sleep(500);
                            break;
                        }
                        await sleep(500);
                    }
                }

            } catch (error) {
                console.error(`第${attemptCount}次提交尝试失败:`, error);
            }

            if (!submitted) {
                await sleep(1000);
            }
        }

        if (submitted) {
            console.log('提交流程完成');
            return true;
        }

        console.log('所有提交尝试均失败');
        return false;
    }

    async function autoNextSection() {
        if (!window.autoNextEnabled) {
            console.log('自动跳转已禁用，跳过跳转');
            return false;
        }

        if (window.isTransitioning) {
            console.log('跳转已在进行中，跳过重复跳转');
            return true;
        }

        console.log('准备自动跳转到下一章节');
        const isInIframe = window !== window.top;
        console.log(`跳转环境: ${isInIframe ? 'iframe内' : '主窗口'}`);


        await sleep(3000);

        let nextSectionAttempts = 0;
        const maxNextSectionAttempts = 3;
        let transitionStarted = false;

        while (nextSectionAttempts < maxNextSectionAttempts && !transitionStarted) {
            nextSectionAttempts++;
            console.log(`尝试跳转到下一章节 (第${nextSectionAttempts}次)`);


            try {
                const navLinks = document.querySelectorAll('a[href*="javascript:NextSCO()"], a[href*="javascript:PrevSCO()"]');
                if (navLinks.length > 0) {
                    const nextLink = Array.from(navLinks).find(link =>
                        link.href.includes('NextSCO') && !link.href.includes('PrevSCO')
                    );

                    if (nextLink) {
                        console.log('找到NextSCO链接，尝试点击');
                        nextLink.click();
                        await sleep(3000);
                        transitionStarted = true;
                        break;
                    }
                }
            } catch (e) {
                console.log('点击NextSCO链接失败:', e);
            }

            if (transitionStarted) break;


            try {
                console.log('尝试直接执行NextSCO函数');
                const scriptEl = document.createElement('script');
                scriptEl.textContent = `
                try {
                    if (typeof NextSCO === 'function') {
                        NextSCO();
                        console.log("成功执行NextSCO函数");
                    }
                } catch(e) {
                    console.error("执行NextSCO出错:", e);
                }
            `;
                document.body.appendChild(scriptEl);
                document.body.removeChild(scriptEl);
                await sleep(2000);
                transitionStarted = true;
                break;
            } catch (e) {
                console.log('执行NextSCO函数失败:', e);
            }

            if (transitionStarted) break;


            try {
                window.location.href = 'javascript:void(0); try { NextSCO(); } catch(e) {}';
                await sleep(2000);
                transitionStarted = true;
                break;
            } catch (e) {
                console.log('通过location.href跳转失败:', e);
            }

            if (!transitionStarted && nextSectionAttempts < maxNextSectionAttempts) {
                console.log('本次跳转尝试失败，等待后重试');
                await sleep(2000);
            }
        }

        if (transitionStarted) {
            console.log('已成功触发跳转，等待新页面加载');
            window.isTransitioning = false;
            return true;
        }

        console.log('所有跳转尝试都失败');
        window.isTransitioning = false;
        return false;
    }

    async function ensureCorrectContext() {

        const isInIframe = window !== window.top;
        console.log(`当前环境: ${isInIframe ? 'iframe内' : '主窗口'}`);


        if (isInIframe && window.name === 'contentFrame') {
            console.log('已在答题的iframe中，可以直接答题');
            return;
        }


        if (!isInIframe) {
            console.log('在主窗口中，尝试切换到contentFrame');


            let contentFrame = document.getElementById('contentFrame');


            if (!contentFrame) {
                const frames = document.getElementsByTagName('iframe');
                for (let i = 0; i < frames.length; i++) {
                    if (frames[i].name === 'contentFrame') {
                        contentFrame = frames[i];
                        break;
                    }
                }
            }


            if (contentFrame) {
                console.log('找到contentFrame，准备在其中执行答题');

                try {

                    return executeInContentFrame(contentFrame);
                } catch (e) {
                    console.error('向contentFrame执行答题失败:', e);
                }
            } else {

                const iframes = document.querySelectorAll('iframe');
                console.log(`共找到${iframes.length}个iframe`);

                for (let i = 0; i < iframes.length; i++) {
                    try {
                        const iframe = iframes[i];
                        if (!iframe.contentDocument) continue;

                        const hasQuizElements =
                            iframe.contentDocument.querySelector('et-choice') ||
                            iframe.contentDocument.querySelector('et-tof') ||
                            iframe.contentDocument.querySelector('span.key') ||
                            iframe.contentDocument.querySelector('div.key') ||
                            iframe.contentDocument.querySelector('select[ng-model]') ||
                            iframe.contentDocument.querySelector('button');

                        if (hasQuizElements) {
                            console.log(`找到可能的答题iframe: ${iframe.name || iframe.id || i}`);
                            return executeInContentFrame(iframe);
                        }
                    } catch (e) {
                        console.log(`检查iframe ${i}失败:`, e);
                    }
                }

                console.log('未找到答题iframe，直接在当前窗口执行');
            }
        }
    }

    function executeInContentFrame(frame) {
        console.log('准备在iframe中执行答题');

        try {
            const scriptContent = `
            if (!window.weLearnHelperInjected) {
                window.weLearnHelperInjected = true;
                window.defaultAccuracyRate = ${window.defaultAccuracyRate};
                window.isAutoLoopActive = ${window.isAutoLoopActive};
                window.autoLoopTimeout = null;
                window.waitTimerActive = ${window.waitTimerActive};
                window.waitTimerInterval = null;
                window.defaultWaitTime = ${window.defaultWaitTime};
                window.autoNextEnabled = ${window.autoNextEnabled};
                window.autoSubmitEnabled = ${window.autoSubmitEnabled};

                try {
                    window.parent.postMessage({
                        action: 'iframeReady',
                        frameId: '${frame.id || frame.name || 'unknown'}'
                    }, '*');
                } catch (e) {
                    console.log('iframe通信错误，但继续执行:', e.message);
                }

                const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
                const createEvent = (type, options = {}) => new Event(type, {bubbles: true, cancelable: true, ...options});

                ${autoFillAnswers.toString()}
                ${autoSelectCorrectAnswers.toString()}
                ${autoSelectDropdownAnswers.toString()}
                ${autoMatchLines.toString()}
                ${submitAnswers.toString()}
                ${handleQuestion.toString()}
                ${handlePickerQuestions.toString()}

                window.addEventListener('message', function(event) {
                    try {
                        if (event.data && event.data.action === 'runQuizFunctions') {
                            console.log('iframe收到执行答题请求:', event.data.step);
                            const executeAsync = async () => {
                                try {
                                    switch(event.data.step) {
                                        case 'selectAnswers':
                                            await autoSelectCorrectAnswers();
                                            break;
                                        case 'fillAnswers':
                                            await autoFillAnswers();
                                            break;
                                        case 'selectDropdowns':
                                            await autoSelectDropdownAnswers();
                                            break;
                                        case 'matchLines':
                                            await autoMatchLines();
                                            break;
                                        case 'submitAnswers':
                                            await submitAnswers();
                                            break;
                                        case 'pickerQuestions':
                                            await handlePickerQuestions();
                                            break;
                                    }
                                    window.parent.postMessage({
                                        action: 'stepComplete',
                                        step: event.data.step
                                    }, '*');
                                } catch (error) {
                                    console.error('执行答题操作失败:', error);
                                    try {
                                        window.parent.postMessage({
                                            action: 'stepError',
                                            step: event.data.step,
                                            error: error.message
                                        }, '*');
                                    } catch (e) {
                                        console.log('发送错误消息失败:', e.message);
                                    }
                                }
                            };
                            executeAsync();
                        }
                    } catch (e) {
                        console.log('处理iframe消息时出错，但继续执行:', e.message);
                    }
                });
            }
        `;

            const script = document.createElement('script');
            script.textContent = scriptContent;

            try {
                frame.contentDocument.body.appendChild(script);
                frame.contentDocument.body.removeChild(script);
                console.log('已将答题脚本注入到iframe中');
            } catch (e) {
                console.log('注入脚本到iframe失败，但继续执行:', e.message);
            }

            return {
                autoSelectCorrectAnswers: () => sendCommandToIframe(frame, 'selectAnswers'),
                autoFillAnswers: () => sendCommandToIframe(frame, 'fillAnswers'),
                autoSelectDropdownAnswers: () => sendCommandToIframe(frame, 'selectDropdowns'),
                autoMatchLines: () => sendCommandToIframe(frame, 'matchLines'),
                submitAnswers: () => sendCommandToIframe(frame, 'submitAnswers'),
                handlePickerQuestions: () => sendCommandToIframe(frame, 'pickerQuestions')
            };
        } catch (e) {
            console.log('iframe操作失败，但继续执行:', e.message);
            return null;
        }
    }

    function handleIframeMessage(event) {
        if (event.data && event.data.action) {
            if (event.data.action === 'iframeReady') {
                console.log(`iframe已就绪: ${event.data.frameId}`);
            } else if (event.data.action === 'stepComplete') {
                console.log(`iframe完成步骤: ${event.data.step}`);
            } else if (event.data.action === 'stepError') {
                console.error(`iframe执行出错: ${event.data.error}`);
            }
        }
    }

    async function sendCommandToIframe(frame, step) {
        return new Promise((resolve, reject) => {
            let timeout;
            try {
                const frameDoc = frame.contentDocument || frame.contentWindow.document;
                const questionCount = frameDoc.querySelectorAll('et-choice[et-index], et-tof[et-index], span[autocapitalize="none"], textarea.blank, span.key, div.key, select[ng-model], et-matching[et-index]').length;

                const baseTimeout = 30000;
                const additionalTimePerTenQuestions = 30000;
                timeout = baseTimeout + Math.ceil(questionCount / 10) * additionalTimePerTenQuestions;

                console.log(`题目数量: ${questionCount}, 设置超时时间: ${timeout / 1000}秒`);
            } catch (e) {
                console.log('计算题目数量失败，使用默认超时时间60秒:', e.message);
                timeout = 60000;
            }

            let timeoutHandle;
            let isCompleted = false;

            const messageHandler = (event) => {
                try {
                    if (!event.data) return;

                    if (event.data.action === 'stepComplete' && event.data.step === step) {
                        isCompleted = true;
                        cleanup();
                        resolve();
                    } else if (event.data.action === 'stepError' && event.data.step === step) {
                        cleanup();
                        reject(new Error(event.data.error || '未知iframe错误'));
                    }
                } catch (e) {
                    console.log('处理iframe消息时出错，但继续执行:', e.message);
                }
            };

            const cleanup = () => {
                if (timeoutHandle) {
                    clearTimeout(timeoutHandle);
                    timeoutHandle = null;
                }
                try {
                    window.removeEventListener('message', messageHandler);
                } catch (e) {
                    console.log('清理事件监听器失败:', e.message);
                }
            };

            timeoutHandle = setTimeout(() => {
                if (!isCompleted) {
                    cleanup();
                    console.log(`向iframe发送${step}命令超时，但继续执行`);
                    resolve();
                }
            }, timeout);

            try {
                window.addEventListener('message', messageHandler);
            } catch (e) {
                console.log('添加消息监听器失败，但继续执行:', e.message);
            }

            try {
                frame.contentWindow.postMessage({
                    action: 'runQuizFunctions',
                    step: step
                }, '*');
                console.log(`已向iframe发送${step}命令`);
            } catch (e) {
                console.log('向iframe发送命令失败，但继续执行:', e.message);
                cleanup();
                resolve();
            }
        });
    }

    function createIntegratedUI() {
        const globalStyle = document.createElement('style');
        globalStyle.id = 'welearn-helper-style';
        globalStyle.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(-120%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.03); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }

      @keyframes subtlePopIn {
        0% { opacity: 0; transform: scale(0.95) translateY(5px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }

      @keyframes shine {
        0% { background-position: -150% 50%; }
        100% { background-position: 250% 50%; }
      }

      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes titleGlow {
        0% { text-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
        50% { text-shadow: 0 0 15px rgba(76, 175, 80, 0.8), 0 0 25px rgba(76, 175, 80, 0.4); }
        100% { text-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
      }

      @keyframes borderPulse {
        0% { border-color: rgba(255, 255, 255, 0.15); }
        50% { border-color: rgba(76, 175, 80, 0.3); }
        100% { border-color: rgba(255, 255, 255, 0.15); }
      }

      #welearnHelperPanel {
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 10000;
        background: rgba(28, 32, 34, 0.75);
        backdrop-filter: blur(10px) saturate(180%);
        -webkit-backdrop-filter: blur(10px) saturate(180%);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35),
                   0 2px 8px rgba(76, 175, 80, 0.15),
                   inset 0 0 0 0.5px rgba(255, 255, 255, 0.15);
        padding: 18px;
        color: #e0e0e0;
        font-size: 14px;
        width: 290px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        animation: slideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }

      #welearnHelperPanel:hover {
        transform: translateY(-3px) scale(1.01);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4),
                   0 4px 12px rgba(76, 175, 80, 0.2),
                   inset 0 0 0 0.5px rgba(255, 255, 255, 0.2);
      }

      .welearn-title-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg,
          rgba(76, 175, 80, 0.15),
          rgba(56, 142, 60, 0.1),
          rgba(76, 175, 80, 0.15));
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background-size: 200% 200%;
        animation: gradientFlow 8s ease infinite;
        margin: -18px -18px 6px -18px;
        padding: 16px 18px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px 12px 0 0;
        position: relative;
        overflow: hidden;
      }

      .welearn-title-bar::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent);
        transform: translateX(-100%);
        animation: shine 8s infinite;
      }

      .welearn-title-bar::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg,
          transparent,
          rgba(76, 175, 80, 0.5),
          transparent);
        animation: borderPulse 4s infinite;
      }

      .welearn-title {
        font-weight: 600;
        font-size: 20px;
        background: linear-gradient(135deg, #ffffff 30%, #4CAF50);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        animation: titleGlow 3s ease-in-out infinite;
        letter-spacing: 0.5px;
        position: relative;
        padding-left: 24px;
      }

      .welearn-title::before {
        content: '🎯';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        animation: pulse 2s ease-in-out infinite;
      }

      .welearn-minimize-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #c0c0c0;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .welearn-minimize-btn:hover {
        background-color: rgba(76, 175, 80, 0.25);
        color: #ffffff;
        transform: rotate(180deg) scale(1.1);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      }

      .welearn-minimize-btn.minimized:hover {
        transform: rotate(-180deg) scale(1.1);
      }

      .welearn-minimize-btn::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(circle at center,
          rgba(255, 255, 255, 0.1) 0%,
          transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .welearn-minimize-btn:hover::before {
        opacity: 1;
      }

      .welearn-button-container {
        display: flex;
        gap: 10px;
        animation: fadeIn 0.5s ease-out 0.2s both;
      }

      .welearn-button {
        position: relative;
        flex: 1;
        padding: 10px 14px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        font-size: 13.5px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
        color: white;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.2);
      }

      .welearn-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.15),
          transparent
        );
        transition: 0.5s;
      }

      .welearn-button:hover::before {
        animation: shine 1.2s infinite linear;
      }

      .welearn-button:hover {
        transform: translateY(-2.5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2),
                   inset 0 0 0 0.5px rgba(255, 255, 255, 0.3);
      }

      .welearn-button:active {
        transform: scale(0.96) translateY(-1px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }

      .welearn-auto-button {
        background: linear-gradient(135deg, 
          rgba(38, 166, 154, 0.95) 0%, 
          rgba(0, 121, 107, 0.95) 100%);
      }

      .welearn-auto-button:hover {
        background: linear-gradient(135deg, 
          rgba(42, 183, 169, 0.95) 0%, 
          rgba(0, 137, 123, 0.95) 100%);
        box-shadow: 0 5px 18px rgba(38, 166, 154, 0.35),
                   inset 0 0 0 0.5px rgba(255, 255, 255, 0.3);
      }

      .welearn-loop-button {
        background: linear-gradient(135deg, 
          rgba(92, 107, 192, 0.95) 0%, 
          rgba(57, 73, 171, 0.95) 100%);
      }

      .welearn-loop-button:hover {
        background: linear-gradient(135deg, 
          rgba(111, 125, 214, 0.95) 0%, 
          rgba(71, 88, 184, 0.95) 100%);
        box-shadow: 0 5px 18px rgba(92, 107, 192, 0.35),
                   inset 0 0 0 0.5px rgba(255, 255, 255, 0.3);
      }

      .welearn-loop-active {
        background: linear-gradient(135deg, #ef5350 0%, #d32f2f 100%);
        animation: pulse 1.8s infinite ease-in-out;
      }

      .welearn-loop-active:hover {
        background: linear-gradient(135deg, #fa6e6b 0%, #e53935 100%);
        box-shadow: 0 5px 18px rgba(239, 83, 80, 0.45);
      }

      .welearn-timer-container, .welearn-accuracy-container {
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        padding: 10px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: fadeIn 0.5s ease-out 0.3s both;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.05);
      }

      .welearn-timer-container:hover, .welearn-accuracy-container:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.1);
      }

      .welearn-accuracy-container {
         animation-delay: 0.2s;
      }

      .welearn-time-input, .welearn-accuracy-input {
        width: 45px;
        padding: 7px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        text-align: center;
        font-weight: 500;
        color: #e0e0e0;
        transition: all 0.25s ease;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      .welearn-time-input:hover, .welearn-accuracy-input:hover {
        transform: scale(1.05);
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .welearn-time-input:focus, .welearn-accuracy-input:focus {
        outline: none;
        border-color: #26a69a;
        background-color: rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 10px rgba(38, 166, 154, 0.5),
                   inset 0 1px 3px rgba(0, 0, 0, 0.2);
        transform: scale(1.08);
      }

      .welearn-countdown {
        margin-left: auto;
        font-weight: 500;
        min-width: 65px;
        text-align: right;
        color: #80cbc4;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        transition: color 0.3s ease, transform 0.3s ease;
      }
      .welearn-countdown.status-update {
        animation: subtlePopIn 0.4s ease-out;
      }

      .welearn-status {
        font-size: 11.5px;
        color: #9e9e9e;
        text-align: center;
        padding: 7px;
        background-color: rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-radius: 6px;
        animation: fadeIn 0.5s ease-out 0.4s both;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.05);
      }

      .welearn-loop-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background-color: rgba(239, 83, 80, 0.15);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        padding: 7px;
        border-radius: 6px;
        margin-top: 2px;
        font-weight: 500;
        font-size: 12.5px;
        border: 1px solid rgba(239, 83, 80, 0.25);
        color: #f5c8c7;
        animation: fadeIn 0.5s ease-out;
        box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.1);
      }

      @media (max-width: 768px) {
        #welearnHelperPanel {
          width: calc(100% - 30px);
          left: 15px;
          top: 15px;
        }
      }
    `;

        document.head.appendChild(globalStyle);

        const mainPanel = document.createElement('div');
        mainPanel.id = 'welearnHelperPanel';

        const titleBar = document.createElement('div');
        titleBar.className = 'welearn-title-bar';

        const title = document.createElement('div');
        title.className = 'welearn-title';
        title.textContent = 'Welearn助手';


        const themeButton = document.createElement('button');
        themeButton.className = 'welearn-theme-button';
        themeButton.innerHTML = '🎨';
        themeButton.style.cssText = `
      background: none;
      border: none;
      color: ${currentTheme?.textColor || '#e0e0e0'};
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      transition: all 0.3s ease;
      margin-right: 10px;
    `;

        themeButton.addEventListener('mouseover', () => {
            themeButton.style.transform = 'rotate(180deg) scale(1.1)';
        });

        themeButton.addEventListener('mouseout', () => {
            themeButton.style.transform = 'none';
        });

        themeButton.addEventListener('click', () => {
            let themePanel = document.getElementById('welearnThemePanel');
            if (!themePanel) {
                themePanel = createThemePanel();
                document.body.appendChild(themePanel);
            }
            themePanel.style.display = themePanel.style.display === 'none' ? 'block' : 'none';
        });

        const minimizeBtn = document.createElement('button');
        minimizeBtn.className = 'welearn-minimize-btn';
        minimizeBtn.textContent = '-';
        minimizeBtn.onclick = () => {
            const content = document.getElementById('welearnHelperContent');
            const payBtn = document.querySelector('.welearn-pay-btn');
            if (content.style.display === 'none') {
                content.style.display = 'flex';
                if (payBtn) payBtn.style.display = 'block';
                minimizeBtn.textContent = '-';
            } else {
                content.style.display = 'none';
                if (payBtn) payBtn.style.display = 'none';
                minimizeBtn.textContent = '+';
            }
        };

        titleBar.appendChild(title);
        titleBar.appendChild(themeButton);
        titleBar.appendChild(minimizeBtn);
        mainPanel.appendChild(titleBar);

        const content = document.createElement('div');
        content.id = 'welearnHelperContent';
        content.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';


        const accuracyContainer = document.createElement('div');
        accuracyContainer.className = 'welearn-accuracy-container';

        const accuracyLabel = document.createElement('span');
        accuracyLabel.textContent = '正确率:';
        accuracyLabel.style.fontWeight = '500';

        const accuracyInput = document.createElement('input');
        accuracyInput.id = 'accuracyInput';
        accuracyInput.className = 'welearn-accuracy-input';
        accuracyInput.type = 'number';
        accuracyInput.min = '0';
        accuracyInput.max = '100';
        accuracyInput.value = defaultAccuracyRate.toString();
        accuracyInput.style.cssText = `
            width: 60px;
            padding: 7px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            text-align: center;
            font-weight: 500;
            color: #e0e0e0;
            transition: all 0.25s ease;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            font-size: 14px;
        `;

        const percentLabel = document.createElement('span');
        percentLabel.textContent = '%';
        percentLabel.style.fontWeight = '500';


        accuracyInput.addEventListener('change', function () {
            const newRate = parseInt(this.value, 10);
            if (!isNaN(newRate) && newRate >= 0 && newRate <= 100) {
                defaultAccuracyRate = newRate;
            } else {
                this.value = defaultAccuracyRate.toString();
            }
        });

        accuracyContainer.appendChild(accuracyLabel);
        accuracyContainer.appendChild(accuracyInput);
        accuracyContainer.appendChild(percentLabel);


        content.appendChild(accuracyContainer);


        const autoNextContainer = document.createElement('div');
        autoNextContainer.className = 'welearn-accuracy-container';
        autoNextContainer.style.justifyContent = 'space-between';

        const autoNextLabel = document.createElement('span');
        autoNextLabel.textContent = '自动跳转下一章:';
        autoNextLabel.style.fontWeight = '500';

        const autoNextCheckbox = document.createElement('input');
        autoNextCheckbox.type = 'checkbox';
        autoNextCheckbox.id = 'autoNextCheckbox';
        autoNextCheckbox.className = 'welearn-checkbox';
        autoNextCheckbox.checked = window.autoNextEnabled;
        autoNextCheckbox.style.cssText = `
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #4CAF50;
      transition: all 0.3s ease;
    `;


        const style = document.createElement('style');
        style.textContent = `
      .welearn-checkbox:hover {
        transform: scale(1.1);
        box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
      }
      .welearn-checkbox:checked {
        animation: checkmark 0.2s ease-in-out;
      }
      @keyframes checkmark {
        0% { transform: scale(1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
      }
    `;
        document.head.appendChild(style);


        autoNextCheckbox.addEventListener('change', function () {
            window.autoNextEnabled = this.checked;

            const container = this.closest('.welearn-accuracy-container');
            container.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            setTimeout(() => {
                container.style.backgroundColor = '';
            }, 300);
        });

        autoNextContainer.appendChild(autoNextLabel);
        autoNextContainer.appendChild(autoNextCheckbox);


        content.insertBefore(autoNextContainer, accuracyContainer.nextSibling);


        const autoSubmitContainer = document.createElement('div');
        autoSubmitContainer.className = 'welearn-accuracy-container';
        autoSubmitContainer.style.justifyContent = 'space-between';

        const autoSubmitLabel = document.createElement('span');
        autoSubmitLabel.textContent = '自动提交答案:';
        autoSubmitLabel.style.fontWeight = '500';

        const autoSubmitCheckbox = document.createElement('input');
        autoSubmitCheckbox.type = 'checkbox';
        autoSubmitCheckbox.id = 'autoSubmitCheckbox';
        autoSubmitCheckbox.className = 'welearn-checkbox';
        autoSubmitCheckbox.checked = window.autoSubmitEnabled;
        autoSubmitCheckbox.style.cssText = `
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #4CAF50;
      transition: all 0.3s ease;
    `;


        autoSubmitCheckbox.addEventListener('change', function () {
            window.autoSubmitEnabled = this.checked;

            const container = this.closest('.welearn-accuracy-container');
            container.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            setTimeout(() => {
                container.style.backgroundColor = '';
            }, 300);


            const frames = document.getElementsByTagName('iframe');
            for (const frame of frames) {
                try {
                    frame.contentWindow.postMessage({
                        action: 'updateAutoSubmit',
                        enabled: this.checked
                    }, '*');
                } catch (e) {
                    console.log('向iframe发送自动提交状态更新失败:', e);
                }
            }
        });

        autoSubmitContainer.appendChild(autoSubmitLabel);
        autoSubmitContainer.appendChild(autoSubmitCheckbox);


        content.insertBefore(autoSubmitContainer, autoNextContainer.nextSibling);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'welearn-button-container';

        const autoAnswerButton = document.createElement('button');
        autoAnswerButton.id = 'autoAnswerButton';
        autoAnswerButton.textContent = '一键全自动';
        autoAnswerButton.className = 'welearn-button welearn-auto-button';

        const autoLoopButton = document.createElement('button');
        autoLoopButton.id = 'autoLoopButton';
        autoLoopButton.textContent = '开始自动挂机';
        autoLoopButton.className = 'welearn-button welearn-loop-button';


        autoAnswerButton.onclick = async function () {
            await runAutoAnswerProcess(false);
        };

        autoLoopButton.onclick = async function () {
            await toggleAutoLoop();
        };

        buttonContainer.appendChild(autoAnswerButton);
        buttonContainer.appendChild(autoLoopButton);
        content.appendChild(buttonContainer);

        const timerContainer = document.createElement('div');
        timerContainer.id = 'waitTimerContainer';
        timerContainer.className = 'welearn-timer-container';

        const label = document.createElement('span');
        label.textContent = '刷时长:';
        label.style.fontWeight = '500';

        const timeInput = document.createElement('input');
        timeInput.id = 'waitTimeInput';
        timeInput.className = 'welearn-time-input';
        timeInput.type = 'number';
        timeInput.min = '1';
        timeInput.max = '3600';
        timeInput.value = defaultWaitTime.toString();
        timeInput.style.cssText = `
            width: 60px;
            padding: 7px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            text-align: center;
            font-weight: 500;
            color: #e0e0e0;
            transition: all 0.25s ease;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
            font-size: 14px;
        `;



        timeInput.addEventListener('change', function () {
            const newTime = parseInt(this.value, 10);
            if (!isNaN(newTime) && newTime > 0) {
                defaultWaitTime = newTime;

                const countdownDisplay = document.getElementById('countdownDisplay');
                if (countdownDisplay) {
                    const originalText = countdownDisplay.textContent;
                    const originalColor = countdownDisplay.style.color;

                    countdownDisplay.textContent = '已保存';
                    countdownDisplay.style.color = '#4CAF50';
                    countdownDisplay.classList.add('status-update');

                    setTimeout(() => {
                        if (countdownDisplay) {
                            countdownDisplay.textContent = originalText;
                            countdownDisplay.style.color = originalColor;
                            countdownDisplay.classList.remove('status-update');
                        }
                    }, 1000);
                }
            }
        });

        const secondsLabel = document.createElement('span');
        secondsLabel.textContent = '秒';
        secondsLabel.style.fontWeight = '500';

        const statusDisplay = document.createElement('div');
        statusDisplay.id = 'countdownDisplay';
        statusDisplay.className = 'welearn-countdown';
        statusDisplay.textContent = '未开始';

        timerContainer.appendChild(label);
        timerContainer.appendChild(timeInput);
        timerContainer.appendChild(secondsLabel);
        timerContainer.appendChild(statusDisplay);
        content.appendChild(timerContainer);

        const statusContainer = document.createElement('div');
        statusContainer.className = 'welearn-status';
        statusContainer.textContent = 'by恶搞之家';
        content.appendChild(statusContainer);

        const loopStatus = document.createElement('div');
        loopStatus.id = 'loopStatusIndicator';
        loopStatus.className = 'welearn-loop-status';
        loopStatus.style.display = 'none';
        loopStatus.textContent = '自动挂机中';
        content.appendChild(loopStatus);

        mainPanel.appendChild(content);


        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        titleBar.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === titleBar || e.target === title) {
                isDragging = true;
                titleBar.style.cursor = 'grabbing';
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, mainPanel);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            titleBar.style.cursor = 'grab';
        }

        return mainPanel;
    }

    async function executeWaitTimer(callback) {
        const timeInput = document.getElementById('waitTimeInput');
        const countdownDisplay = document.getElementById('countdownDisplay');


        let waitTime = parseInt(timeInput?.value || defaultWaitTime);
        if (isNaN(waitTime) || waitTime < 1) {
            waitTime = defaultWaitTime;
            if (timeInput) timeInput.value = defaultWaitTime.toString();
        } else {

            defaultWaitTime = waitTime;
        }


        if (waitTime <= 0) {
            if (typeof callback === 'function') callback();
            return;
        }


        if (countdownDisplay) {
            countdownDisplay.textContent = waitTime + ' 秒';
            countdownDisplay.style.color = '#00ffcc';
            countdownDisplay.style.display = 'block';
        }


        if (waitTimerInterval) {
            clearInterval(waitTimerInterval);
        }


        waitTimerActive = true;
        let remainingTime = waitTime;

        return new Promise(resolve => {
            waitTimerInterval = setInterval(() => {
                remainingTime--;

                if (countdownDisplay) {
                    countdownDisplay.textContent = remainingTime + ' 秒';


                    if (remainingTime <= 10 && remainingTime > 0) {
                        countdownDisplay.style.color = '#ff6b6b';
                        countdownDisplay.style.transform = 'scale(1.05)';
                    } else {
                        countdownDisplay.style.transform = 'scale(1)';
                    }
                }


                if (remainingTime <= 0) {
                    clearInterval(waitTimerInterval);
                    waitTimerInterval = null;
                    waitTimerActive = false;

                    if (countdownDisplay) {
                        countdownDisplay.textContent = '完成!';
                        countdownDisplay.style.color = '#4CAF50';
                        countdownDisplay.classList.add('status-update');


                        setTimeout(() => {
                            if (countdownDisplay) {
                                countdownDisplay.textContent = '未开始';
                                countdownDisplay.style.color = '#80cbc4';
                                countdownDisplay.classList.remove('status-update');
                            }
                        }, 3000);
                    }


                    if (typeof callback === 'function') callback();
                    resolve();
                }
            }, 1000);
        });
    }

    function cancelWaitTimer() {
        if (waitTimerInterval) {
            clearInterval(waitTimerInterval);
            waitTimerInterval = null;
        }

        waitTimerActive = false;

        const countdownDisplay = document.getElementById('countdownDisplay');
        if (countdownDisplay) {
            countdownDisplay.textContent = '已取消';
            countdownDisplay.style.color = '#ff9800';
            countdownDisplay.classList.add('status-update');


            setTimeout(() => {
                if (countdownDisplay) {
                    countdownDisplay.textContent = '未开始';
                    countdownDisplay.style.color = '#80cbc4';
                    countdownDisplay.classList.remove('status-update');
                }
            }, 3000);
        }
    }

    function addButton() {

        if (window !== window.top) {
            console.log('当前在iframe中，不添加按钮');
            return;
        }


        removeExistingButtons();



        const uiPanel = createIntegratedUI();
        document.body.appendChild(uiPanel);


        updateButtonsState();
    }

    function updateButtonsState() {
        const loopButton = document.getElementById('autoLoopButton');
        if (loopButton) {
            if (isAutoLoopActive) {
                loopButton.textContent = '停止自动挂机';
                loopButton.className = 'welearn-button welearn-loop-active';
                showLoopStatus(true);
            } else {
                loopButton.textContent = '开始自动挂机';
                loopButton.className = 'welearn-button welearn-loop-button';
                showLoopStatus(false);
            }
        }
    }

    function showLoopStatus(isActive) {
        let statusIndicator = document.getElementById('loopStatusIndicator');
        if (!statusIndicator) return;

        if (isActive) {
            statusIndicator.innerHTML = '<span style="display:inline-block;width:10px;height:10px;background-color:red;border-radius:50%;margin-right:5px;animation:blink 1s infinite;"></span> 自动挂机中';
            statusIndicator.style.display = 'flex';


            const style = document.createElement('style');
            style.id = 'loopStatusStyle';
            style.textContent = `
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `;
            if (!document.getElementById('loopStatusStyle')) {
                document.head.appendChild(style);
            }
        } else {
            statusIndicator.style.display = 'none';
        }
    }

    async function toggleAutoLoop() {
        if (!isAutoLoopActive) {

            isAutoLoopActive = true;


            updateButtonsState();


            showLoopStatus(true);


            await runAutoAnswerProcess(true);
        } else {

            stopAutoLoop();
        }
    }

    function stopAutoLoop() {
        console.log('停止自动挂机');
        isAutoLoopActive = false;


        if (autoLoopTimeout) {
            clearTimeout(autoLoopTimeout);
            autoLoopTimeout = null;
        }


        cancelWaitTimer();


        updateButtonsState();


        showLoopStatus(false);
    }

    async function runAutoAnswerProcess(isLoop) {
        if (!isLoop && isAutoLoopActive) {
            console.log('自动挂机已激活，单次执行被忽略');
            return;
        }

        try {
            const answerButton = document.getElementById('autoAnswerButton');

            if (isLoop) {
                if (answerButton) {
                    answerButton.textContent = '等待中...';
                    answerButton.style.backgroundColor = 'orange';
                }

                await executeWaitTimer(() => {
                    if (answerButton) {
                        answerButton.textContent = '开始答题...';
                    }
                });

                if (!isAutoLoopActive) return;
            }

            if (answerButton) {
                answerButton.textContent = '检测环境...';
                answerButton.style.backgroundColor = 'orange';
            }

            const iframeFunctions = await ensureCorrectContext();


            const selectAnswersFn = iframeFunctions ? iframeFunctions.autoSelectCorrectAnswers : autoSelectCorrectAnswers;
            const fillAnswersFn = iframeFunctions ? iframeFunctions.autoFillAnswers : autoFillAnswers;
            const selectDropdownsFn = iframeFunctions ? iframeFunctions.autoSelectDropdownAnswers : autoSelectDropdownAnswers;
            const matchLinesFn = iframeFunctions ? iframeFunctions.autoMatchLines : autoMatchLines;
            const submitAnswersFn = iframeFunctions ? iframeFunctions.submitAnswers : submitAnswers;
            const handlePickerQuestionsFn = iframeFunctions ? iframeFunctions.handlePickerQuestions : handlePickerQuestions;

            let hasQuestions = false;

            let doc = document;
            const contentFrame = document.getElementById('contentFrame');
            if (contentFrame && contentFrame.contentDocument) {
                doc = contentFrame.contentDocument;
            }

            const questionSelectors = [
                'et-choice[et-index]',
                'et-tof[et-index]',
                'div[data-controltype="choice"]',
                'div.white_frame_normal_choice',
                'div[data-score]',
                'ul[data-itemtype="options"]',

                'span[autocapitalize="none"]',
                'textarea.blank',
                'span.key',
                'div.key',
                'input[data-itemtype="input"]',
                'textarea[data-itemtype="input"]',
                'textarea[data-itemtype="textarea"]',

                'select[ng-model]',

                'et-matching[et-index]',
                'span.blank[ng-attr-tabindex]',
            ];

            const checkForQuestions = (document) => {
                for (const selector of questionSelectors) {
                    const elements = document.querySelectorAll(selector);
                    if (elements.length > 0) {
                        console.log(`找到题目类型 ${selector}:`, elements.length);
                        return true;
                    }
                }
                return false;
            };

            hasQuestions = checkForQuestions(doc);

            if (!hasQuestions) {
                const iframes = document.getElementsByTagName('iframe');
                for (const iframe of iframes) {
                    try {
                        if (iframe.contentDocument) {
                            hasQuestions = checkForQuestions(iframe.contentDocument);
                            if (hasQuestions) {
                                doc = iframe.contentDocument;
                                break;
                            }
                        }
                    } catch (e) {
                        console.log('检查iframe失败:', e);
                    }
                }
            }

            if (answerButton) {
                answerButton.textContent = '检测题目...';
            }

            const hasChoiceQuestions = (
                doc.querySelectorAll('et-choice[et-index], et-tof[et-index], div[data-controltype="choice"], div.white_frame_normal_choice, div[data-score], ul[data-itemtype="options"]').length > 0
            ) || (
                    window.frames['contentFrame']?.document.querySelectorAll('et-choice[et-index], et-tof[et-index], div[data-controltype="choice"], div.white_frame_normal_choice, div[data-score], ul[data-itemtype="options"]').length > 0
                );

            if (hasChoiceQuestions) {
                hasQuestions = true;
                await selectAnswersFn();
                console.log('选择题和判断题处理完成');
                await sleep(1000);
            }

            if (answerButton) {
                answerButton.textContent = '检测填空题...';
            }
            const hasBlankQuestions = (doc.querySelectorAll('span[autocapitalize="none"], textarea.blank, span.key, div.key, input[data-solution], textarea[data-solution]').length > 0) ||
                (window.frames['contentFrame']?.document.querySelectorAll('span[autocapitalize="none"], textarea.blank, span.key, div.key, input[data-solution], textarea[data-solution]').length > 0);
            if (hasBlankQuestions) {
                hasQuestions = true;
                await fillAnswersFn();
                console.log('填空题处理完成');
                await sleep(1000);
            }

            if (answerButton) {
                answerButton.textContent = '检测下拉框...';
            }
            const hasDropdowns = (doc.querySelectorAll('select[ng-model]').length > 0) ||
                (window.frames['contentFrame']?.document.querySelectorAll('select[ng-model]').length > 0);
            if (hasDropdowns) {
                hasQuestions = true;
                await selectDropdownsFn();
                console.log('下拉框处理完成');
                await sleep(1000);
            }

            if (answerButton) {
                answerButton.textContent = '检测连线题...';
            }
            const hasMatchingQuestions = (doc.querySelectorAll('et-matching[et-index]').length > 0) ||
                (window.frames['contentFrame']?.document.querySelectorAll('et-matching[et-index]').length > 0);
            if (hasMatchingQuestions) {
                hasQuestions = true;
                await matchLinesFn();
                console.log('连线题处理完成');
                await sleep(1000);
            }

            if (answerButton) {
                answerButton.textContent = '检测单元测试...';
            }
            const hasUnitTest = (doc.querySelectorAll('span.unittestresult').length > 0) ||
                (window.frames['contentFrame']?.document.querySelectorAll('span.unittestresult').length > 0);
            if (hasUnitTest) {
                hasQuestions = true;
                await handleUnitTestAnswers();
                console.log('单元测试题处理完成');
                await sleep(1000);
            }

            const hasTabExercise = (doc.querySelectorAll('li[ng-click*="tab.go"]').length > 0) ||
                (window.frames['contentFrame']?.document.querySelectorAll('li[ng-click*="tab.go"]').length > 0);

            if (hasTabExercise) {
                hasQuestions = true;
                if (answerButton) {
                    answerButton.textContent = '处理标签页练习...';
                }
                await handleTabExercises();
                console.log('标签页练习处理完成');
                await sleep(1000);
            }


            if (answerButton) {
                answerButton.textContent = '检测选择框题目...';
            }
            const hasPickerQuestions = (doc.querySelectorAll('span.blank[ng-attr-tabindex]').length > 0) ||
                (window.frames['contentFrame']?.document.querySelectorAll('span.blank[ng-attr-tabindex]').length > 0);
            if (hasPickerQuestions) {
                hasQuestions = true;
                await handlePickerQuestions();
                console.log('选择框题目处理完成');
                await sleep(1000);
            }

            if (!hasQuestions) {
                console.log('未找到需要处理的题目，准备跳转到下一章节...');
                if (answerButton) {
                    answerButton.textContent = window.autoNextEnabled ? '跳转中...' : '已完成';
                    answerButton.style.backgroundColor = window.autoNextEnabled ? 'blue' : 'green';
                }
                if (window.autoNextEnabled) {
                    await autoNextSection();
                }
            } else {

                await sleep(2000);

                if (answerButton) {
                    answerButton.textContent = window.autoSubmitEnabled ? '提交中...' : '已完成';
                }

                let submitResult = false;
                if (window.autoSubmitEnabled) {
                    submitResult = await submitAnswersFn();
                } else {
                    console.log('自动提交已禁用，跳过提交');
                }

                if (!submitResult) {
                    if (answerButton) {
                        answerButton.textContent = window.autoNextEnabled ? '跳转中...' : '已完成';
                        answerButton.style.backgroundColor = window.autoNextEnabled ? 'blue' : 'green';
                    }
                    if (window.autoNextEnabled) {
                        await autoNextSection();
                    }
                }
            }

            if (isLoop && isAutoLoopActive) {
                if (answerButton) {
                    answerButton.textContent = '准备下一轮...';
                    answerButton.style.backgroundColor = 'purple';
                }

                console.log('等待页面加载，准备下一轮答题...');
                autoLoopTimeout = setTimeout(async () => {
                    console.log('开始下一轮答题');
                    if (isAutoLoopActive) {
                        await runAutoAnswerProcess(true);
                    }
                }, 3000);
            } else {
                if (answerButton) {
                    answerButton.textContent = '已完成';
                    answerButton.style.backgroundColor = 'green';

                    setTimeout(() => {
                        if (answerButton && !isAutoLoopActive) {
                            answerButton.textContent = '一键全自动';
                            answerButton.style.backgroundColor = 'rgb(0, 255, 127)';
                        }
                    }, 3000);
                }
            }
        } catch (error) {
            console.error('自动化流程出错:', error);

            const answerButton = document.getElementById('autoAnswerButton');
            if (answerButton) {
                answerButton.textContent = '出错了!';
                answerButton.style.backgroundColor = 'red';
            }

            if (isLoop && isAutoLoopActive) {
                console.log('自动挂机出错，10秒后重试...');
                autoLoopTimeout = setTimeout(async () => {
                    console.log('重新开始挂机');
                    if (isAutoLoopActive) {
                        await runAutoAnswerProcess(true);
                    }
                }, 10000);
            } else {
                setTimeout(() => {
                    if (answerButton && !isAutoLoopActive) {
                        answerButton.textContent = '一键全自动';
                        answerButton.style.backgroundColor = 'rgb(0, 255, 127)';
                    }
                }, 5000);
            }
        }
    }

    function removeExistingButtons() {

        const welearnPanel = document.getElementById('welearnHelperPanel');
        if (welearnPanel && welearnPanel.parentNode) {
            welearnPanel.parentNode.removeChild(welearnPanel);
        }


        const oldElements = [
            document.getElementById('autoAnswerButton'),
            document.getElementById('autoLoopButton'),
            document.getElementById('autoAnswerButtonContainer'),
            document.getElementById('autoAnswerInfoText'),
            document.getElementById('loopStatusIndicator'),
            document.getElementById('waitTimerContainer')
        ];

        oldElements.forEach(element => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });


        const allFixedElements = document.querySelectorAll('*[style*="position: fixed"], *[style*="position:fixed"]');
        for (const element of allFixedElements) {

            const computedStyle = window.getComputedStyle(element);
            const top = parseInt(computedStyle.top);
            const left = parseInt(computedStyle.left);


            if (top <= 50 && left <= 300 && !element.closest('#welearnHelperPanel') &&
                (element.tagName === 'BUTTON' ||
                    element.tagName === 'DIV' ||
                    element.id.includes('auto') ||
                    element.id.includes('button') ||
                    (element.textContent && (
                        element.textContent.includes('一键') ||
                        element.textContent.includes('全自动') ||
                        element.textContent.includes('自动') ||
                        element.textContent.includes('挂机') ||
                        element.textContent.includes('答题') ||
                        element.textContent.includes('提交')
                    ))
                )) {
                console.log('强制移除外部元素:', element.tagName, element.id || element.className, element.textContent?.substring(0, 20));
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }
        }


        const loopStyle = document.getElementById('loopStatusStyle');
        if (loopStyle && loopStyle.parentNode) {
            loopStyle.parentNode.removeChild(loopStyle);
        }


        cancelWaitTimer();

        console.log('移除已存在的UI元素');
    }

    function clearExternalButtons() {

        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {

            if (button.closest('#welearnHelperPanel')) {
                return;
            }


            if (button.textContent && (
                button.textContent.includes('一键') ||
                button.textContent.includes('全自动') ||
                button.textContent.includes('自动') ||
                button.textContent.includes('挂机') ||
                button.textContent === '一键全自动' ||
                button.textContent === '开始自动挂机' ||
                button.textContent === '停止自动挂机'
            )) {
                console.log('强制移除外部按钮:', button.textContent);
                if (button.parentNode) {
                    button.parentNode.removeChild(button);
                }
            }
        });


        const containers = document.querySelectorAll('div[style*="position: fixed"], div[style*="position:fixed"]');
        containers.forEach(container => {

            if (container.id === 'welearnHelperPanel' || container.closest('#welearnHelperPanel')) {
                return;
            }


            const style = window.getComputedStyle(container);
            const top = parseInt(style.top);
            const left = parseInt(style.left);


            if (top <= 50 && left <= 50) {

                const innerButtons = container.querySelectorAll('button');
                if (innerButtons.length > 0) {
                    console.log('移除外部按钮容器:', container.id || container.className);
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                }
            }
        });


        const buttonContainer = document.getElementById('autoAnswerButtonContainer');
        if (buttonContainer) {
            console.log('移除autoAnswerButtonContainer');
            buttonContainer.parentNode.removeChild(buttonContainer);
        }
    }

    window.addEventListener('beforeunload', () => {
        stopAutoLoop();
    });

    let observer;

    function setupObserver() {

        if (observer) {
            observer.disconnect();
        }


        observer = new MutationObserver((mutations) => {

            clearExternalButtons();


            const hasPanel = document.getElementById('welearnHelperPanel');
            const hasButton = document.getElementById('autoAnswerButton');


            if ((!hasPanel || !hasButton) && window === window.top) {
                console.log('DOM变化检测到面板或按钮不存在，添加面板');

                removeExistingButtons();

                addButton();
            }


            setTimeout(clearExternalButtons, 100);
        });


        if (window === window.top) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });


            clearExternalButtons();
        }
    }

    function setupPageListeners() {

        window.removeEventListener('load', handlePageLoad);


        window.addEventListener('load', handlePageLoad);


        if (window === window.top) {

            let lastUrl = window.location.href;
            const checkURLChange = () => {
                if (lastUrl !== window.location.href) {
                    console.log('URL已变化，重新添加按钮');
                    lastUrl = window.location.href;


                    setTimeout(() => {
                        removeExistingButtons();
                        addButton();
                    }, 1000);
                }
            };


            setInterval(checkURLChange, 1000);
        }
    }

    function handlePageLoad() {
        console.log('页面加载完成，检查按钮');

        if (window === window.top) {
            removeExistingButtons();
            addButton();
        }
    }

    function initialize() {
        if (window.weLearnHelperInitialized) {
            console.log('助手已初始化，跳过');
            return;
        }

        window.weLearnHelperInitialized = true;
        window.isTransitioning = false;
        console.log('初始化WeLearn助手');


        if (window === window.top) {
            let lastTransitionTime = 0;
            const TRANSITION_COOLDOWN = 5000;

            window.addEventListener('message', function (event) {
                if (event.data && event.data.action === 'nextSection') {
                    const currentTime = Date.now();
                    if (currentTime - lastTransitionTime < TRANSITION_COOLDOWN) {
                        console.log('跳转冷却中，忽略重复请求');
                        return;
                    }


                    if (!window.autoNextEnabled) {
                        console.log('自动跳转已禁用，忽略跳转请求');
                        return;
                    }

                    console.log('收到iframe的跳转请求');
                    lastTransitionTime = currentTime;

                    try {
                        if (typeof NextSCO === 'function' && !window.isTransitioning) {
                            window.isTransitioning = true;
                            NextSCO();
                            console.log('成功执行NextSCO');
                            setTimeout(() => {
                                window.isTransitioning = false;
                            }, 5000);
                        }
                    } catch (e) {
                        console.error('执行NextSCO失败:', e);
                        window.isTransitioning = false;
                    }
                }
            });
        }

        if (window === window.top) {
            removeExistingButtons();
            addButton();
            setupObserver();
            setupPageListeners();
        }
    }

    initialize();

    async function simulateHTML5DragDrop(sourceElement, targetElement) {
        if (!sourceElement || !targetElement) return;

        console.log('使用HTML5拖放API模拟拖拽');

        try {

            const dragStartEvent = new DragEvent('dragstart', {
                bubbles: true,
                cancelable: true,
                dataTransfer: new DataTransfer()
            });


            dragStartEvent.dataTransfer.setData('text/plain', 'dragged');


            sourceElement.dispatchEvent(dragStartEvent);
            await new Promise(resolve => setTimeout(resolve, 200));


            const dragOverEvent = new DragEvent('dragover', {
                bubbles: true,
                cancelable: true,
                dataTransfer: dragStartEvent.dataTransfer
            });
            targetElement.dispatchEvent(dragOverEvent);
            await new Promise(resolve => setTimeout(resolve, 200));


            const dropEvent = new DragEvent('drop', {
                bubbles: true,
                cancelable: true,
                dataTransfer: dragStartEvent.dataTransfer
            });
            targetElement.dispatchEvent(dropEvent);


            const dragEndEvent = new DragEvent('dragend', {
                bubbles: true,
                cancelable: true,
                dataTransfer: dragStartEvent.dataTransfer
            });
            sourceElement.dispatchEvent(dragEndEvent);

            console.log('HTML5拖放事件序列完成');
        } catch (e) {
            console.error('HTML5拖放模拟失败:', e);
        }
    }

    async function simulateMouseDrag(sourceElement, targetElement, coords) {
        if (!sourceElement || !targetElement) return;

        console.log('使用增强的鼠标事件模拟拖拽');

        const { fromX, fromY, toX, toY } = coords;


        const dragVisual = document.createElement('div');
        dragVisual.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 10000;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid #4CAF50;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2),
                  0 8px 24px rgba(0, 0, 0, 0.15);
      padding: 8px;
      transform-origin: center center;
      backdrop-filter: blur(4px);
      will-change: transform, opacity;
    `;


        if (sourceElement.tagName.toLowerCase() === 'circle') {
            dragVisual.style.width = '24px';
            dragVisual.style.height = '24px';
            dragVisual.style.borderRadius = '50%';
            dragVisual.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            dragVisual.style.border = '2px solid rgba(255, 255, 255, 0.8)';
            dragVisual.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)';
        } else {
            dragVisual.innerHTML = sourceElement.innerHTML;
            dragVisual.style.width = sourceElement.offsetWidth + 'px';
            dragVisual.style.height = sourceElement.offsetHeight + 'px';

            dragVisual.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.92))';
        }

        document.body.appendChild(dragVisual);

        try {

            requestAnimationFrame(() => {
                dragVisual.style.opacity = '1';
                dragVisual.style.transform = 'scale(1.05) translateY(-2px)';
            });


            const mouseDownEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: fromX,
                clientY: fromY,
                button: 0
            });
            sourceElement.dispatchEvent(mouseDownEvent);


            dragVisual.style.left = `${fromX}px`;
            dragVisual.style.top = `${fromY}px`;


            const dx = toX - fromX;
            const dy = toY - fromY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const curvatureHeight = -Math.min(distance * 0.3, 100);

            const controlX = (fromX + toX) / 2;
            const controlY = Math.min(fromY, toY) + curvatureHeight;


            const steps = 30;
            const stepDuration = 12;

            for (let i = 1; i <= steps; i++) {
                const progress = i / steps;
                const ease = easeInOutCubic(progress);


                const t = ease;
                const moveX = Math.pow(1 - t, 2) * fromX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * toX;
                const moveY = Math.pow(1 - t, 2) * fromY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * toY;


                const rotation = Math.sin(progress * Math.PI) * 2;


                const scale = 1.05 - Math.abs(progress - 0.5) * 0.1;


                dragVisual.style.transform = `
          translate3d(${moveX - dragVisual.offsetWidth / 2}px,
                     ${moveY - dragVisual.offsetHeight / 2}px,
                     0)
          scale(${scale})
          rotate(${rotation}deg)
        `;


                const shadowBlur = 12 - Math.abs(progress - 0.5) * 8;
                const shadowOpacity = 0.2 + Math.abs(progress - 0.5) * 0.1;
                dragVisual.style.boxShadow = `
          0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0, 0, 0, ${shadowOpacity}),
          0 ${shadowBlur / 2}px ${shadowBlur}px rgba(76, 175, 80, 0.2)
        `;


                const mouseMoveEvent = new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: moveX,
                    clientY: moveY,
                    button: 0
                });
                document.elementFromPoint(moveX, moveY)?.dispatchEvent(mouseMoveEvent);

                await new Promise(resolve => setTimeout(resolve, stepDuration));
            }


            const mouseUpEvent = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: toX,
                clientY: toY,
                button: 0
            });


            dragVisual.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            dragVisual.style.transform = 'scale(0.8) translateY(10px)';
            dragVisual.style.opacity = '0';

            targetElement.dispatchEvent(mouseUpEvent);


            await new Promise(resolve => setTimeout(resolve, 200));
            document.body.removeChild(dragVisual);


            targetElement.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            targetElement.style.transform = 'scale(1.1)';
            await new Promise(resolve => setTimeout(resolve, 100));
            targetElement.style.transform = '';

            console.log('增强的鼠标拖拽事件序列完成');
        } catch (e) {
            console.error('增强的鼠标拖拽模拟失败:', e);

            if (document.body.contains(dragVisual)) {
                document.body.removeChild(dragVisual);
            }
        }
    }


    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }


    function bezierPoint(t, p0, p1, p2) {
        const oneMinusT = 1 - t;
        return Math.pow(oneMinusT, 2) * p0 + 2 * oneMinusT * t * p1 + Math.pow(t, 2) * p2;
    }


    async function simulateDragDrop(sourceElement, targetElement, coords) {
        if (!sourceElement || !targetElement) return;

        console.log('使用增强的组合事件模拟拖拽');

        const { fromX, fromY, toX, toY } = coords;

        try {

            sourceElement.style.transition = 'transform 0.2s ease-out';
            sourceElement.style.transform = 'scale(1.05)';

            sourceElement.dispatchEvent(new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: fromX,
                clientY: fromY
            }));

            await new Promise(resolve => setTimeout(resolve, 100));

            const dragStartEvent = new Event('dragstart', { bubbles: true, cancelable: true });
            sourceElement.dispatchEvent(dragStartEvent);


            const steps = 20;
            const controlX = (fromX + toX) / 2;
            const controlY = Math.min(fromY, toY) - 40;

            for (let i = 1; i <= steps; i++) {
                const t = i / steps;
                const moveX = bezierPoint(t, fromX, controlX, toX);
                const moveY = bezierPoint(t, fromY, controlY, toY);

                document.dispatchEvent(new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: moveX,
                    clientY: moveY
                }));

                await new Promise(resolve => setTimeout(resolve, 15));
            }


            targetElement.style.transition = 'transform 0.2s ease-out';
            targetElement.style.transform = 'scale(1.1)';

            targetElement.dispatchEvent(new Event('dragover', { bubbles: true, cancelable: true }));
            await new Promise(resolve => setTimeout(resolve, 100));

            targetElement.dispatchEvent(new Event('drop', { bubbles: true, cancelable: true }));
            sourceElement.dispatchEvent(new Event('dragend', { bubbles: true, cancelable: true }));

            targetElement.dispatchEvent(new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: toX,
                clientY: toY
            }));


            sourceElement.style.transform = '';
            targetElement.style.transform = '';

            console.log('增强的组合拖拽事件序列完成');
        } catch (e) {
            console.error('增强的组合拖拽模拟失败:', e);

            sourceElement.style.transform = '';
            targetElement.style.transform = '';
        }
    }

    async function handleTabNavigation(retryCount = 3) {
        for (let attempt = 1; attempt <= retryCount; attempt++) {
            try {

                let doc = document;
                if (window !== window.top) {
                    doc = document;
                } else {
                    const contentFrame = document.getElementById('contentFrame');
                    if (contentFrame && contentFrame.contentDocument) {
                        doc = contentFrame.contentDocument;
                    }
                }


                if (attempt > 1) {
                    console.log(`第${attempt}次尝试查找标签页...`);
                    await sleep(1000 * attempt);
                }


                const headerTabSelectors = [
                    'ul.headerTab.center',
                    'ul[header][class*="headerTab"][class*="center"]',
                    'ul[class*="headerTab"][class*="center"]',
                    'et-tab ul[header]'
                ];

                let headerTab = null;
                for (const selector of headerTabSelectors) {
                    headerTab = doc.querySelector(selector);
                    if (headerTab) {
                        console.log(`找到headerTab，使用选择器: ${selector}`);
                        break;
                    }
                }

                if (!headerTab) {
                    console.log('未找到headerTab center标签');
                    return false;
                }


                const tabSelectors = [
                    'li[ng-click*="tab.go"]',
                    'li[count]',
                    'li[ng-class*="tab.active"]'
                ];

                let tabElements = [];
                for (const selector of tabSelectors) {
                    const elements = headerTab.querySelectorAll(selector);
                    if (elements.length > 0) {
                        tabElements = Array.from(elements);
                        console.log(`找到标签页元素，使用选择器: ${selector}`);
                        break;
                    }
                }

                if (tabElements.length === 0) {
                    console.log('未找到标签页元素');
                    return false;
                }


                const tabInfo = tabElements.map(tab => {
                    const info = {
                        element: tab,
                        goNumber: -1,
                        activeNumber: -1,
                        count: -1
                    };


                    const ngClickAttr = tab.getAttribute('ng-click');
                    if (ngClickAttr) {
                        const goMatch = ngClickAttr.match(/tab\.go\((\d+)\)/);
                        if (goMatch) {
                            info.goNumber = parseInt(goMatch[1]);
                        }
                    }


                    const ngClassAttr = tab.getAttribute('ng-class');
                    if (ngClassAttr) {
                        const activeMatch = ngClassAttr.match(/tab\.active === (\d+)/);
                        if (activeMatch) {
                            info.activeNumber = parseInt(activeMatch[1]);
                        }
                    }


                    const countAttr = tab.getAttribute('count');
                    if (countAttr) {
                        info.count = parseInt(countAttr);
                    }

                    return info;
                });


                const lastTab = tabInfo.reduce((prev, current) => {

                    if (current.goNumber > prev.goNumber) return current;
                    if (current.goNumber < prev.goNumber) return prev;


                    if (current.activeNumber > prev.activeNumber) return current;
                    if (current.activeNumber < prev.activeNumber) return prev;


                    if (current.count > prev.count) return current;
                    return prev;
                });

                if (lastTab.element) {
                    console.log(`找到最后的标签页:`, {
                        goNumber: lastTab.goNumber,
                        activeNumber: lastTab.activeNumber,
                        count: lastTab.count
                    });


                    const isCurrentTab = lastTab.element.classList.contains('active');
                    if (!isCurrentTab) {
                        console.log('尝试点击最后的标签页');


                        const triggerClick = async () => {

                            if (typeof angular !== 'undefined') {
                                try {
                                    const scope = angular.element(lastTab.element).scope();
                                    if (scope && scope.tab && typeof scope.tab.go === 'function') {
                                        await new Promise(resolve => {
                                            scope.$apply(() => {
                                                scope.tab.go(lastTab.goNumber);
                                                resolve();
                                            });
                                        });
                                        return true;
                                    }
                                } catch (e) {
                                    console.log('Angular触发失败:', e);
                                }
                            }


                            try {
                                const events = [
                                    new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
                                    new MouseEvent('mouseup', { bubbles: true, cancelable: true }),
                                    new MouseEvent('click', { bubbles: true, cancelable: true }),
                                    new Event('focus', { bubbles: true, cancelable: true })
                                ];

                                for (const event of events) {
                                    lastTab.element.dispatchEvent(event);
                                    await sleep(100);
                                }
                                return true;
                            } catch (e) {
                                console.log('事件触发失败:', e);
                            }


                            try {
                                lastTab.element.click();
                                return true;
                            } catch (e) {
                                console.log('直接点击失败:', e);
                                return false;
                            }
                        };


                        const clickResult = await triggerClick();
                        if (clickResult) {
                            await sleep(1000);
                            return true;
                        }
                    } else {
                        console.log('已经在最后的标签页');
                        return true;
                    }
                }

                return false;
            } catch (error) {
                console.error(`第${attempt}次尝试出错:`, error);
                if (attempt < retryCount) {
                    continue;
                }
            }
        }

        console.error(`在${retryCount}次尝试后仍未能成功处理标签页`);
        return false;
    }

    async function handleTabExercises() {
        console.log('开始处理带标签页的练习题目');

        try {

            const headerTabResult = await handleTabNavigation();
            if (headerTabResult) {
                console.log('成功处理headerTab navigation');
                await sleep(1000);
            }


            const tabElements = document.querySelectorAll('li[ng-click*="tab.go"]');
            if (tabElements.length === 0) {
                console.log('未找到标签页元素');
                return false;
            }

            console.log(`找到${tabElements.length}个标签页`);


            for (let i = 0; i < tabElements.length; i++) {
                const tab = tabElements[i];
                console.log(`切换到第${i + 1}个标签页`);


                try {
                    tab.click();
                    await sleep(1000);


                    if (typeof angular !== 'undefined') {
                        const scope = angular.element(tab).scope();
                        if (scope) {
                            scope.$apply();
                        }
                    }


                    await sleep(2000);


                    await autoSelectCorrectAnswers();
                    await autoFillAnswers();
                    await autoSelectDropdownAnswers();
                    await autoMatchLines();
                    await handleUnitTestAnswers();


                    if (i === tabElements.length - 1) {
                        console.log('到达最后一个标签页,准备提交答案');
                        await sleep(1000);

                        if (window.autoSubmitEnabled) {
                            console.log('准备提交答案');
                            const submitResult = await submitAnswers();
                            if (submitResult && !window.autoNextEnabled) {
                                return true;
                            }
                        } else {
                            console.log('自动提交已禁用，跳过提交');
                        }
                    } else {
                        await sleep(1000);
                    }
                } catch (error) {
                    console.error(`处理第${i + 1}个标签页时出错:`, error);
                }
            }

            return true;
        } catch (error) {
            console.error('处理标签页练习题目时出错:', error);
            return false;
        }
    }

    async function handlePickerQuestions() {
        console.log('开始处理选择框题目');
        let answered = false;

        try {
            let doc = document;
            if (window !== window.top) {
                doc = document;
            } else {
                const contentFrame = document.getElementById('contentFrame');
                if (contentFrame && contentFrame.contentDocument) {
                    doc = contentFrame.contentDocument;
                }
            }


            const blankElements = Array.from(doc.querySelectorAll('span.blank[ng-attr-tabindex]'));
            const totalQuestions = blankElements.length;
            console.log('找到空白框数量:', totalQuestions);

            if (totalQuestions === 0) return false;


            const correctCount = Math.ceil((totalQuestions * window.defaultAccuracyRate) / 100);
            const wrongCount = totalQuestions - correctCount;
            console.log(`总题目: ${totalQuestions}, 正确数: ${correctCount}, 错误数: ${wrongCount}`);


            let allAnswers = [];
            if (wrongCount > 0) {
                for (const blank of blankElements) {
                    const keySpan = blank.closest('et-blank')?.querySelector('span[ng-if="blank.hasKey"]');
                    if (keySpan) {
                        allAnswers.push({
                            blank: blank,
                            answer: keySpan.textContent.trim()
                        });
                    }
                }


                if (allAnswers.length < 2) {
                    console.log('答案数量不足，无法实现错误率要求');
                    return false;
                }


                if (wrongCount >= 2) {

                    for (let i = allAnswers.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
                    }


                    const swapCount = Math.min(wrongCount, Math.floor(allAnswers.length / 2));
                    for (let i = 0; i < swapCount * 2; i += 2) {
                        const temp = allAnswers[i].answer;
                        allAnswers[i].answer = allAnswers[i + 1].answer;
                        allAnswers[i + 1].answer = temp;
                    }
                }
            }


            for (let i = 0; i < blankElements.length; i++) {
                const blankElement = blankElements[i];
                try {

                    const existingPicker = doc.querySelector('div.optionsPicker.visible');
                    if (existingPicker) {
                        const closeButton = existingPicker.querySelector('a.close');
                        if (closeButton) {
                            closeButton.click();
                            await sleep(500);
                        }
                    }

                    console.log(`准备处理第${i + 1}个空白框`);

                    if (!isElementVisible(blankElement)) {
                        console.log('空白框不可见，跳过');
                        continue;
                    }


                    async function enhancedClick(element) {
                        try {
                            element.click();
                            await sleep(200);

                            const rect = element.getBoundingClientRect();
                            const centerX = rect.left + rect.width / 2;
                            const centerY = rect.top + rect.height / 2;

                            const eventTypes = ['mouseenter', 'mouseover', 'mousedown', 'mouseup', 'click'];
                            for (const eventType of eventTypes) {
                                const event = new Event(eventType, {
                                    bubbles: true,
                                    cancelable: true
                                });

                                Object.defineProperties(event, {
                                    clientX: { value: centerX },
                                    clientY: { value: centerY },
                                    screenX: { value: centerX },
                                    screenY: { value: centerY }
                                });

                                element.dispatchEvent(event);
                                await sleep(50);
                            }

                            ['focus', 'focusin'].forEach(eventType => {
                                const event = new Event(eventType, {
                                    bubbles: true,
                                    cancelable: true
                                });
                                element.dispatchEvent(event);
                            });
                            await sleep(100);

                            if (typeof angular !== 'undefined') {
                                const scope = angular.element(element).scope();
                                if (scope && scope.blank) {
                                    if (typeof scope.blank.click === 'function') {
                                        scope.blank.click();
                                    }
                                    if (typeof scope.blank.focus === 'function') {
                                        scope.blank.focus();
                                    }
                                    scope.$apply();
                                }
                            }

                            const parentWrapper = element.closest('span.wrapper');
                            if (parentWrapper) {
                                parentWrapper.click();
                                await sleep(100);
                            }

                            const etBlank = element.closest('et-blank');
                            if (etBlank) {
                                etBlank.click();
                                await sleep(100);
                            }

                        } catch (e) {
                            console.error('增强点击失败:', e);
                        }
                    }

                    await enhancedClick(blankElement);
                    await sleep(500);


                    let optionsPicker = null;
                    let optionsWrapper = null;
                    let attempts = 0;
                    const maxAttempts = 5;

                    while (!optionsWrapper && !optionsPicker && attempts < maxAttempts) {
                        optionsPicker = doc.querySelector('div.optionsPicker.visible');
                        optionsWrapper = doc.querySelector('div.optionsWrapper')
                        if (!optionsPicker && !optionsWrapper) {
                            console.log(`等待选择框出现，尝试 ${attempts + 1}/${maxAttempts}`);
                            attempts++;
                            if (attempts > 2) {
                                await enhancedClick(blankElement);
                            }
                            await sleep(500);
                        }
                    }

                    if (!optionsPicker && !optionsWrapper) {
                        console.log('选择框未出现，跳过当前空白框');
                        continue;
                    }


                    let targetAnswer;
                    if (wrongCount > 0 && allAnswers.length > 0) {

                        const answerObj = allAnswers.find(a => a.blank === blankElement);
                        if (answerObj) {
                            targetAnswer = answerObj.answer;
                            console.log('使用交换后的答案:', targetAnswer);
                        } else {

                            const keySpan = blankElement.closest('et-blank')?.querySelector('span[ng-if="blank.hasKey"]');
                            targetAnswer = keySpan ? keySpan.textContent.trim() : null;
                            console.log('使用原始答案:', targetAnswer);
                        }
                    } else {

                        const keySpan = blankElement.closest('et-blank')?.querySelector('span[ng-if="blank.hasKey"]');
                        targetAnswer = keySpan ? keySpan.textContent.trim() : null;
                        console.log('使用原始答案:', targetAnswer);
                    }

                    if (!targetAnswer) {
                        console.log('未找到答案，跳过当前空白框');
                        continue;
                    }


                    let optionsList = null;
                    let options = [];

                    try {

                        if (!doc) {
                            console.log('文档对象不存在，跳过当前空白框');
                            continue;
                        }


                        optionsPicker = doc.querySelector('div.optionsPicker.visible');
                        optionsWrapper = doc.querySelector('div.optionsWrapper');

                        console.log('选择框状态:', {
                            hasOptionsPicker: !!optionsPicker,
                            hasOptionsWrapper: !!optionsWrapper
                        });


                        if (optionsPicker && optionsPicker.querySelector) {
                            console.log('从optionsPicker中查找选项列表');
                            const pickerList = optionsPicker.querySelector('ul');
                            if (pickerList && pickerList.querySelectorAll) {
                                const pickerOptions = pickerList.querySelectorAll('li[ng-click*="options.toggle"]');
                                if (pickerOptions && pickerOptions.length > 0) {
                                    optionsList = pickerList;
                                    options = Array.from(pickerOptions);
                                    console.log('在optionsPicker中找到', options.length, '个选项');
                                }
                            }
                        }


                        if ((!optionsList || options.length === 0) && optionsWrapper && optionsWrapper.querySelector) {
                            console.log('从optionsWrapper中查找选项列表');
                            const wrapperList = optionsWrapper.querySelector('ul');
                            if (wrapperList && wrapperList.querySelectorAll) {
                                const wrapperOptions = wrapperList.querySelectorAll('li[ng-click*="options.toggle"]');
                                if (wrapperOptions && wrapperOptions.length > 0) {
                                    optionsList = wrapperList;
                                    options = Array.from(wrapperOptions);
                                    console.log('在optionsWrapper中找到', options.length, '个选项');
                                }
                            }
                        }


                        if (!optionsList || options.length === 0) {
                            console.log('尝试从整个文档中查找选项列表');
                            try {
                                const lists = doc.querySelectorAll('.optionsPicker.visible ul, .optionsWrapper ul');
                                if (lists && lists.length > 0) {
                                    for (const list of lists) {
                                        if (list && list.querySelectorAll) {
                                            const docOptions = list.querySelectorAll('li[ng-click*="options.toggle"]');
                                            if (docOptions && docOptions.length > 0) {
                                                optionsList = list;
                                                options = Array.from(docOptions);
                                                console.log('在文档中找到', options.length, '个选项');
                                                break;
                                            }
                                        }
                                    }
                                }
                            } catch (e) {
                                console.error('从文档查找选项时出错:', e);
                            }
                        }

                        if (!optionsList || options.length === 0) {
                            console.log('未找到有效的选项列表或选项为空，跳过当前空白框');
                            continue;
                        }

                        console.log(`最终找到 ${options.length} 个选项`);
                        let optionFound = false;

                        for (const option of options) {
                            if (!option || !option.getAttribute) continue;
                            try {
                                const ngClickAttr = option.getAttribute('ng-click');
                                const toggleMatch = ngClickAttr.match(/toggle\('([^']+)'\)/);

                                if (!toggleMatch) continue;

                                const optionValue = toggleMatch[1];
                                console.log('检查选项:', optionValue);

                                if (optionValue === targetAnswer) {
                                    console.log('找到匹配选项:', optionValue);

                                    option.click();
                                    await sleep(300);

                                    if (typeof angular !== 'undefined') {
                                        const scope = angular.element(option).scope();
                                        if (scope?.options?.toggle) {
                                            scope.options.toggle(optionValue);
                                            scope.$apply();
                                        }
                                    }

                                    optionFound = true;
                                    answered = true;
                                    await sleep(500);
                                    break;
                                }
                            } catch (e) {
                                console.error('处理选项时出错:', e);
                            }
                        }

                        if (!optionFound) {
                            console.log('未找到匹配选项');
                        }

                        if (optionsPicker) {
                            const closeButton = optionsPicker.querySelector('a.close');
                            if (closeButton) {
                                closeButton.click();
                                await sleep(800);
                            }
                        }

                    } catch (error) {
                        console.error('处理空白框时出错:', error);
                    }
                } catch (error) {
                    console.error('处理空白框时出错:', error);
                }
            }
        } catch (error) {
            console.error('处理选择框题目时出错:', error);
        }

        return answered;
    }


    async function _0x42fd(_0x456def) {
        if (!_0x456def) return;

        try {

            _0x456def.click();


            const _0x789abc = new Event('click', {
                bubbles: true,
                cancelable: true
            });
            _0x456def.dispatchEvent(_0x789abc);


            if (typeof angular !== 'undefined') {
                try {
                    const _0x123def = angular.element(_0x456def).scope();
                    if (_0x123def) {
                        if (_0x123def.blank) {
                            console.log(decodeURIComponent('%E6%89%BE%E5%88%B0blank%20scope:'), _0x123def.blank);
                            if (_0x123def.blank.tabIndex) {
                                console.log(decodeURIComponent('%E5%BD%93%E5%89%8DtabIndex:'), _0x123def.blank.tabIndex);
                            }
                        }
                        _0x123def.$apply();
                    }
                } catch (_0x234567) {
                    console.log(decodeURIComponent('%E8%A7%A6%E5%8F%91%E4%BA%8B%E4%BB%B6%E5%A4%B1%E8%B4%A5:'), _0x234567);
                }
            }


            ['mousedown', 'mouseup', 'focus'].forEach(_0x345678 => {
                try {
                    const _0x456789 = new Event(_0x345678, {
                        bubbles: true,
                        cancelable: true
                    });
                    _0x456def.dispatchEvent(_0x456789);
                } catch (_0x567890) {
                    console.log(decodeURIComponent('%E8%A7%A6%E5%8F%91') + _0x345678 + decodeURIComponent('%E4%BA%8B%E4%BB%B6%E5%A4%B1%E8%B4%A5:'), _0x567890);
                }
            });

        } catch (_0x678901) {
            console.log(decodeURIComponent('%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5:'), _0x678901);
            throw _0x678901;
        }
    }


    window.clickElement = _0x42fd;


    const _0xwxpay = {
        showQRCode: function () {

            const existingModal = document.getElementById('wxPayModal');
            if (existingModal) {
                existingModal.remove();
                return;
            }


            const modal = document.createElement('div');
            modal.id = 'wxPayModal';
            modal.style.cssText = `
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(255, 255, 255, 0.95);
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
              z-index: 10001;
              text-align: center;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              min-width: 300px;
          `;


            const title = document.createElement('div');
            title.textContent = decodeURIComponent('%E5%BE%AE%E4%BF%A1%E6%89%AB%E7%A0%81%E6%94%AF%E4%BB%98');
            title.style.cssText = `
              font-size: 16px;
              color: #333;
              margin-bottom: 15px;
              font-weight: bold;
          `;


            const closeBtn = document.createElement('div');
            closeBtn.textContent = '×';
            closeBtn.style.cssText = `
              position: absolute;
              top: 10px;
              right: 15px;
              font-size: 24px;
              cursor: pointer;
              color: #666;
              line-height: 24px;
              width: 24px;
              height: 24px;
              text-align: center;
              border-radius: 12px;
              transition: all 0.3s ease;
          `;

            closeBtn.onmouseover = () => {
                closeBtn.style.background = 'rgba(0, 0, 0, 0.1)';
            };

            closeBtn.onmouseout = () => {
                closeBtn.style.background = 'transparent';
            };

            closeBtn.onclick = () => modal.remove();


            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = `
              width: 200px;
              height: 200px;
              margin: 0 auto 10px;
              border-radius: 8px;
              overflow: hidden;
              border: 1px solid rgba(0, 0, 0, 0.1);
              background: #fff;
          `;


            const qrcode = document.createElement('img');
            qrcode.style.cssText = `
              width: 100%;
              height: 100%;
              object-fit: contain;
          `;


            qrcode.onerror = () => {
                imgContainer.innerHTML = decodeURIComponent('%E5%9B%BE%E7%89%87%E5%8A%A0%E8%BD%BD%E5%A4%B1%E8%B4%A5');
                imgContainer.style.lineHeight = '200px';
                imgContainer.style.color = '#999';
            };


            qrcode.src = 'data:image/png;base64,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'


            imgContainer.appendChild(qrcode);
            modal.appendChild(closeBtn);
            modal.appendChild(title);
            modal.appendChild(imgContainer);
            document.body.appendChild(modal);


            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            };


            const overlay = document.createElement('div');
            overlay.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.3);
              backdrop-filter: blur(2px);
              z-index: 10000;
          `;
            overlay.onclick = () => {
                overlay.remove();
                modal.remove();
            };
            document.body.appendChild(overlay);
        }
    };


    const _0xaddPayButton = function () {

        const existingBtn = document.querySelector('.welearn-pay-btn');
        if (existingBtn) {
            existingBtn.remove();
        }

        const payBtn = document.createElement('div');
        payBtn.className = 'welearn-pay-btn';
        payBtn.textContent = decodeURIComponent('%E8%B5%9E%E8%B5%8F%E4%BD%9C%E8%80%85');
        payBtn.style.cssText = `
          color: #4CAF50;
          font-weight: bold;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          background: rgba(76, 175, 80, 0.1);
          transition: all 0.3s ease;
          text-align: center;
          margin-top: 10px;
          user-select: none;
      `;

        payBtn.onmouseover = () => {
            payBtn.style.background = 'rgba(76, 175, 80, 0.2)';
        };

        payBtn.onmouseout = () => {
            payBtn.style.background = 'rgba(76, 175, 80, 0.1)';
        };

        payBtn.onclick = () => _0xwxpay.showQRCode();


        const panel = document.getElementById('welearnHelperPanel');
        if (panel) {
            panel.appendChild(payBtn);
        }
    };


    const _0xobserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.id === 'welearnHelperPanel') {
                    _0xaddPayButton();
                }
            });
        });
    });


    _0xobserver.observe(document.body, {
        childList: true,
        subtree: true
    });


    window.addEventListener('load', () => {
        setTimeout(_0xaddPayButton, 1000);
    });


    setInterval(() => {
        const panel = document.getElementById('welearnHelperPanel');
        const payBtn = document.querySelector('.welearn-pay-btn');
        if (panel && !payBtn) {
            _0xaddPayButton();
        }
    }, 2000);
})();


<template>
    <div class="NavBar">
        <div v-if="isCapturing" class="countdown">{{ countdown }}</div>
        <div v-if="exitModalVisible" class="modal">
            <div class="modal-content2">
                <p style="margin-top: 7.5vh">AR포토를 종료하고</p>
                <p>메인 페이지로 이동합니다.</p>
                <div class="button-container2">
                    <button class="round-button" style="margin-top: 7vh" @click="exit">나가기</button>
                    <button class="round-button2" style="margin-top: 2vh" @click="exitModalVisible = false">취소</button>
                </div>
            </div>
        </div>
        <div class="top-bar" v-show="isBarVisible" style="background-color: white">
            <button v-if="!isCapturing && arFrameSettingYn === 'N' && !isDecorate" @click="toggleAspectRatio"
                class="aspect-button">
                <div v-if="aspectRatio === 0">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_13_43)">
                            <rect width="32" height="32" fill="white" />
                            <path
                                d="M23 1H9C6.19974 1 4.79961 1 3.73005 1.54497C2.78924 2.02433 2.02433 2.78924 1.54497 3.73005C1 4.79961 1 6.19974 1 9V23C1 25.8003 1 27.2004 1.54497 28.27C2.02433 29.2108 2.78924 29.9757 3.73005 30.455C4.79961 31 6.19974 31 9 31H23C25.8003 31 27.2004 31 28.27 30.455C29.2108 29.9757 29.9757 29.2108 30.455 28.27C31 27.2004 31 25.8003 31 23V9C31 6.19974 31 4.79961 30.455 3.73005C29.9757 2.78924 29.2108 2.02433 28.27 1.54497C27.2004 1 25.8003 1 23 1Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M6.36201 18.636L10.828 12.3H12.214V20H10.278V18.064L10.487 17.943V14.995L8.82601 17.294H11.664L11.851 17.052H13.424V18.636H6.36201ZM14.6257 19.252C14.6257 18.9733 14.7247 18.735 14.9227 18.537C15.1207 18.339 15.3663 18.24 15.6597 18.24C15.9677 18.24 16.217 18.339 16.4077 18.537C16.5983 18.735 16.6937 18.9733 16.6937 19.252C16.6937 19.5307 16.5983 19.769 16.4077 19.967C16.217 20.165 15.9677 20.264 15.6597 20.264C15.3663 20.264 15.1207 20.165 14.9227 19.967C14.7247 19.769 14.6257 19.5307 14.6257 19.252ZM14.6257 15.138C14.6257 14.8593 14.7247 14.621 14.9227 14.423C15.1207 14.225 15.3663 14.126 15.6597 14.126C15.9677 14.126 16.217 14.225 16.4077 14.423C16.5983 14.621 16.6937 14.8593 16.6937 15.138C16.6937 15.4167 16.5983 15.6587 16.4077 15.864C16.217 16.062 15.9677 16.161 15.6597 16.161C15.3663 16.161 15.1207 16.062 14.9227 15.864C14.7247 15.6587 14.6257 15.4167 14.6257 15.138ZM19.8206 17.294C19.8206 17.558 19.8756 17.789 19.9856 17.987C20.1029 18.1777 20.2569 18.328 20.4476 18.438C20.6456 18.5407 20.8693 18.592 21.1186 18.592C21.3606 18.592 21.5769 18.5407 21.7676 18.438C21.9656 18.328 22.1196 18.1777 22.2296 17.987C22.3469 17.789 22.4056 17.558 22.4056 17.294C22.4056 17.0373 22.3469 16.81 22.2296 16.612C22.1196 16.414 21.9656 16.26 21.7676 16.15C21.5769 16.04 21.3606 15.985 21.1186 15.985C20.8693 15.985 20.6456 16.04 20.4476 16.15C20.2569 16.26 20.1029 16.414 19.9856 16.612C19.8756 16.81 19.8206 17.0373 19.8206 17.294ZM21.0966 12.333H23.4506L20.9646 15.116L20.5796 15.281C20.7849 15.0757 20.9793 14.9437 21.1626 14.885C21.3533 14.8263 21.5879 14.797 21.8666 14.797C22.1526 14.797 22.4349 14.8557 22.7136 14.973C22.9996 15.083 23.2563 15.248 23.4836 15.468C23.7183 15.6807 23.9016 15.941 24.0336 16.249C24.1729 16.557 24.2426 16.9053 24.2426 17.294C24.2426 17.9247 24.0996 18.4563 23.8136 18.889C23.5349 19.3143 23.1573 19.637 22.6806 19.857C22.2113 20.0697 21.6906 20.176 21.1186 20.176C20.5393 20.176 20.0113 20.0697 19.5346 19.857C19.0653 19.637 18.6876 19.3143 18.4016 18.889C18.1229 18.4563 17.9836 17.9247 17.9836 17.294C17.9836 16.8833 18.0679 16.502 18.2366 16.15C18.4126 15.798 18.6253 15.468 18.8746 15.16L21.0966 12.333Z"
                                fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13_43">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                        비율</p>
                </div>
                <div v-if="aspectRatio === 1">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_13_42)">
                            <rect width="32" height="32" fill="white" />
                            <path
                                d="M23 1H9C6.19974 1 4.79961 1 3.73005 1.54497C2.78924 2.02433 2.02433 2.78924 1.54497 3.73005C1 4.79961 1 6.19974 1 9V23C1 25.8003 1 27.2004 1.54497 28.27C2.02433 29.2108 2.78924 29.9757 3.73005 30.455C4.79961 31 6.19974 31 9 31H23C25.8003 31 27.2004 31 28.27 30.455C29.2108 29.9757 29.9757 29.2108 30.455 28.27C31 27.2004 31 25.8003 31 23V9C31 6.19974 31 4.79961 30.455 3.73005C29.9757 2.78924 29.2108 2.02433 28.27 1.54497C27.2004 1 25.8003 1 23 1Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M8.87886 14.522V12.905L12.5749 12.157V20H10.7819V14.049L8.87886 14.522ZM14.4645 19.252C14.4645 18.9733 14.5635 18.735 14.7615 18.537C14.9595 18.339 15.2052 18.24 15.4985 18.24C15.8065 18.24 16.0559 18.339 16.2465 18.537C16.4372 18.735 16.5325 18.9733 16.5325 19.252C16.5325 19.5307 16.4372 19.769 16.2465 19.967C16.0559 20.165 15.8065 20.264 15.4985 20.264C15.2052 20.264 14.9595 20.165 14.7615 19.967C14.5635 19.769 14.4645 19.5307 14.4645 19.252ZM14.4645 15.138C14.4645 14.8593 14.5635 14.621 14.7615 14.423C14.9595 14.225 15.2052 14.126 15.4985 14.126C15.8065 14.126 16.0559 14.225 16.2465 14.423C16.4372 14.621 16.5325 14.8593 16.5325 15.138C16.5325 15.4167 16.4372 15.6587 16.2465 15.864C16.0559 16.062 15.8065 16.161 15.4985 16.161C15.2052 16.161 14.9595 16.062 14.7615 15.864C14.5635 15.6587 14.4645 15.4167 14.4645 15.138ZM18.0205 14.522V12.905L21.7165 12.157V20H19.9235V14.049L18.0205 14.522Z"
                                fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13_42">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                        비율</p>
                </div>
                <span v-show="aspectRatio === 2">
                    <img src="../../assets/icon/print-button.png" alt="프린트" style="width: 30px; height: 30px" />
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                        비율</p>
                </span>
            </button>
            <button v-if="timerButtonVisible && !isCapturing && !isDecorate" @click="toggleTimer" class="timer-button">
                <div v-if="timerButtonVisible === 2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6.66666C9.74073 6.66666 4.66663 11.7408 4.66663 18C4.66663 24.2592 9.74073 29.3333 16 29.3333C22.2592 29.3333 27.3333 24.2592 27.3333 18C27.3333 11.7408 22.2592 6.66666 16 6.66666ZM16 6.66666V2.66666M13.3333 2.66666H18.6666M27.1053 7.45604L25.1053 5.45604L26.1053 6.45604M4.89465 7.45604L6.89465 5.45604L5.89465 6.45604"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M15.4313 17.576V16.36C15.7406 16.36 16.0179 16.3227 16.2633 16.248C16.5193 16.1627 16.7379 16.0507 16.9193 15.912C17.1113 15.7733 17.2553 15.6133 17.3513 15.432C17.4473 15.2507 17.4953 15.0587 17.4953 14.856C17.4953 14.6427 17.4473 14.4507 17.3513 14.28C17.2553 14.1093 17.1166 13.9813 16.9353 13.896C16.7539 13.8 16.5193 13.752 16.2313 13.752C15.8046 13.752 15.4526 13.8747 15.1753 14.12C14.8979 14.3653 14.7593 14.6853 14.7593 15.08H12.2793C12.2793 14.4187 12.4393 13.8267 12.7593 13.304C13.0899 12.7707 13.5539 12.3547 14.1513 12.056C14.7486 11.7467 15.4419 11.592 16.2313 11.592C17.0739 11.592 17.7886 11.7307 18.3753 12.008C18.9619 12.2853 19.4046 12.6587 19.7033 13.128C20.0126 13.5973 20.1673 14.12 20.1673 14.696C20.1673 15.336 19.9539 15.8693 19.5273 16.296C19.1113 16.7227 18.5459 17.0427 17.8313 17.256C17.1166 17.4693 16.3166 17.576 15.4313 17.576ZM16.1033 23.256C15.4313 23.256 14.8286 23.1547 14.2953 22.952C13.7619 22.7493 13.3086 22.4667 12.9353 22.104C12.5726 21.7413 12.2899 21.3307 12.0872 20.872C11.8953 20.4133 11.7993 19.9387 11.7993 19.448H14.4553C14.4553 19.8107 14.5353 20.1147 14.6953 20.36C14.8553 20.6053 15.0686 20.7867 15.3353 20.904C15.6126 21.0213 15.9006 21.08 16.1993 21.08C16.5193 21.08 16.7966 21.032 17.0313 20.936C17.2766 20.84 17.4686 20.6853 17.6073 20.472C17.7459 20.2587 17.8153 19.9973 17.8153 19.688C17.8153 19.4533 17.7673 19.24 17.6713 19.048C17.5753 18.856 17.4259 18.6907 17.2233 18.552C17.0313 18.4027 16.7859 18.2907 16.4873 18.216C16.1886 18.1413 15.8366 18.104 15.4313 18.104V16.728C16.1673 16.728 16.8393 16.792 17.4473 16.92C18.0659 17.0373 18.6046 17.2293 19.0633 17.496C19.5219 17.752 19.8739 18.0827 20.1193 18.488C20.3646 18.8933 20.4873 19.3787 20.4873 19.944C20.4873 20.5947 20.3113 21.1707 19.9593 21.672C19.6073 22.1627 19.1059 22.552 18.4553 22.84C17.8046 23.1173 17.0206 23.256 16.1033 23.256Z"
                            fill="black" />
                    </svg>
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                        타이머</p>
                </div>
                <div v-else-if="timerButtonVisible === 3">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6.66666C9.74073 6.66666 4.66663 11.7408 4.66663 18C4.66663 24.2592 9.74073 29.3333 16 29.3333C22.2592 29.3333 27.3333 24.2592 27.3333 18C27.3333 11.7408 22.2592 6.66666 16 6.66666ZM16 6.66666V2.66666M13.3333 2.66666H18.6666M27.1053 7.45604L25.1053 5.45604L26.1053 6.45604M4.89465 7.45604L6.89465 5.45604L5.89465 6.45604"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M20.0238 19.416C20.0238 20.0773 19.8904 20.648 19.6238 21.128C19.3678 21.608 19.0158 22.0027 18.5677 22.312C18.1304 22.6213 17.6451 22.8507 17.1118 23C16.5891 23.1387 16.0558 23.208 15.5118 23.208C14.8291 23.208 14.2104 23.1387 13.6558 23C13.1011 22.872 12.6104 22.7013 12.1838 22.488C11.7571 22.264 11.3678 22.0187 11.0158 21.752L12.0718 19.528C12.3811 19.784 12.6958 20.0027 13.0158 20.184C13.3464 20.3547 13.6771 20.4933 14.0078 20.6C14.3384 20.696 14.6371 20.744 14.9038 20.744C15.3624 20.744 15.7518 20.6853 16.0718 20.568C16.3918 20.4507 16.6371 20.2693 16.8078 20.024C16.9784 19.7787 17.0638 19.48 17.0638 19.128C17.0638 18.7547 16.9571 18.456 16.7438 18.232C16.5411 17.9973 16.2744 17.8267 15.9438 17.72C15.6238 17.6133 15.2771 17.56 14.9038 17.56C14.6158 17.56 14.2958 17.5813 13.9438 17.624C13.6024 17.656 13.2451 17.7253 12.8718 17.832C12.5091 17.928 12.1358 18.072 11.7518 18.264L13.3198 11.8H19.7838V14.136H15.3038L14.6638 16.136C14.9624 15.9973 15.2718 15.9013 15.5918 15.848C15.9224 15.784 16.2638 15.752 16.6158 15.752C17.2131 15.752 17.7678 15.896 18.2798 16.184C18.8024 16.472 19.2238 16.888 19.5438 17.432C19.8638 17.976 20.0238 18.6373 20.0238 19.416Z"
                            fill="black" />
                    </svg>
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                        타이머</p>
                </div>
                <div v-else-if="timerButtonVisible === 4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6.66666C9.74073 6.66666 4.66663 11.7408 4.66663 18C4.66663 24.2592 9.74073 29.3333 16 29.3333C22.2592 29.3333 27.3333 24.2592 27.3333 18C27.3333 11.7408 22.2592 6.66666 16 6.66666ZM16 6.66666V2.66666M13.3333 2.66666H18.6666M27.1053 7.45604L25.1053 5.45604L26.1053 6.45604M4.89465 7.45604L6.89465 5.45604L5.89465 6.45604"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.6597 14.328V11.8H20.7957L15.3877 23H12.4597L16.8277 14.328H11.6597Z" fill="black" />
                    </svg>

                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                        타이머</p>
                </div>
                <div v-else-if="timerButtonVisible === 1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path
                            d="M16 12.6667V18L19.3333 20M16 6.66666C9.74073 6.66666 4.66663 11.7408 4.66663 18C4.66663 24.2592 9.74073 29.3333 16 29.3333C22.2592 29.3333 27.3333 24.2592 27.3333 18C27.3333 11.7408 22.2592 6.66666 16 6.66666ZM16 6.66666V2.66666M13.3333 2.66666H18.6666M27.1053 7.45604L25.1053 5.45604L26.1053 6.45604M4.89465 7.45604L6.89465 5.45604L5.89465 6.45604"
                            stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                        타이머</p>
                </div>
            </button>
            <button v-if="!isDecorate" @click="flipCamera(), (isFlipCamera = !isFlipCamera)" class="flip-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <path
                        d="M35.7927 22.5628C35.3066 27.1301 32.7187 31.4102 28.4364 33.8825C21.3218 37.9901 12.2244 35.5525 8.11682 28.4379L7.67932 27.6801M6.20573 19.4373C6.69188 14.8699 9.27976 10.5899 13.562 8.11758C20.6766 4.00996 29.774 6.4476 33.8816 13.5622L34.3191 14.32M6.11304 31.6156L7.39413 26.8345L12.1752 28.1156M29.8242 13.8845L34.6053 15.1656L35.8864 10.3845"
                        stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button v-if="!isCapturing && !isBeauty && !isDecorate" @click="isBeauty = true" class="beauty-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                        d="M5.99996 29.3334V22.6667M5.99996 9.33335V2.66669M2.66663 6.00002H9.33329M2.66663 26H9.33329M17.3333 4.00002L15.0211 10.0118C14.645 10.9895 14.457 11.4783 14.1647 11.8895C13.9055 12.2539 13.5872 12.5723 13.2227 12.8314C12.8116 13.1238 12.3227 13.3118 11.3451 13.6878L5.33329 16L11.3451 18.3123C12.3227 18.6883 12.8116 18.8763 13.2227 19.1686C13.5872 19.4278 13.9055 19.7462 14.1647 20.1106C14.457 20.5217 14.645 21.0106 15.0211 21.9882L17.3333 28L19.6455 21.9882C20.0215 21.0106 20.2096 20.5217 20.5019 20.1106C20.761 19.7462 21.0794 19.4278 21.4438 19.1686C21.855 18.8763 22.3438 18.6883 23.3215 18.3123L29.3333 16L23.3215 13.6878C22.3438 13.3118 21.855 13.1238 21.4438 12.8314C21.0794 12.5723 20.761 12.2539 20.5019 11.8895C20.2096 11.4783 20.0215 10.9895 19.6455 10.0118L17.3333 4.00002Z"
                        stroke="#252525" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <p
                    style="color: rgba(0, 0, 0, 0.5); text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                    뷰티
                </p>
            </button>
            <button v-if="!isCapturing && isBeauty" @click="isBeauty = false" class="beauty-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                        d="M5.99996 29.3333V22.6667M5.99996 9.33332V2.66666M2.66663 5.99999H9.33329M2.66663 26H9.33329M17.3333 3.99999L15.0211 10.0118C14.645 10.9894 14.457 11.4783 14.1647 11.8894C13.9055 12.2539 13.5872 12.5722 13.2227 12.8314C12.8116 13.1237 12.3227 13.3117 11.3451 13.6878L5.33329 16L11.3451 18.3122C12.3227 18.6882 12.8116 18.8763 13.2227 19.1686C13.5872 19.4277 13.9055 19.7461 14.1647 20.1105C14.457 20.5217 14.645 21.0105 15.0211 21.9882L17.3333 28L19.6455 21.9882C20.0215 21.0105 20.2096 20.5217 20.5019 20.1105C20.761 19.7461 21.0794 19.4277 21.4438 19.1686C21.855 18.8763 22.3438 18.6882 23.3215 18.3122L29.3333 16L23.3215 13.6878C22.3438 13.3117 21.855 13.1237 21.4438 12.8314C21.0794 12.5722 20.761 12.2539 20.5019 11.8894C20.2096 11.4783 20.0215 10.9894 19.6455 10.0118L17.3333 3.99999Z"
                        stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p
                    style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal">
                    뷰티</p>
            </button>
            <button v-if="!isCapturing" @click="exitModalVisible = true" class="exit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <path d="M31.5 10.5L10.5 31.5M10.5 10.5L31.5 31.5" stroke="black" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
        <slot></slot>
        <div v-show="!isSecondFrameBarVisible && !isSecondEffectBarVisible && isBarVisible" class="bottom-bar-1">
            <button v-if="!isCapturing && arFrameSettingYn === 'Y'" @click="frameToggleBar" class="frame-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                        d="M5 13C5 10.1997 5 8.79961 5.54497 7.73005C6.02433 6.78924 6.78924 6.02433 7.73005 5.54497C8.79961 5 10.1997 5 13 5H27C29.8003 5 31.2004 5 32.27 5.54497C33.2108 6.02433 33.9757 6.78924 34.455 7.73005C35 8.79961 35 10.1997 35 13V27C35 29.8003 35 31.2004 34.455 32.27C33.9757 33.2108 33.2108 33.9757 32.27 34.455C31.2004 35 29.8003 35 27 35H13C10.1997 35 8.79961 35 7.73005 34.455C6.78924 33.9757 6.02433 33.2108 5.54497 32.27C5 31.2004 5 29.8003 5 27V13Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 15.8333L10 25H30L22.5 12.5L18.3333 18.3333L15 15.8333Z" stroke="black" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p style="color: #000; text-align: center; font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: normal"
                    :style="frameButtonStyle">
                    배경
                </p>
            </button>
            <button v-if="!isCapturing" @click="capture" class="capture-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 86 86" fill="none">
                    <circle cx="43" cy="43" r="40" fill="white" stroke="#252525" stroke-width="5" />
                </svg>
            </button>
            <button v-if="isCapturing" @click="stopCapture" class="capture-button">
                <img src="../../assets/icon/round-close-button.png" alt="타이머 촬영 종료" style="width: 50px; height: 50px" />
            </button>
            <button v-if="!isCapturing" @click="effectToggleBar" class="effect-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path
                        d="M15 25.5903C16.3269 26.7779 18.0791 27.5 20 27.5C24.1421 27.5 27.5 24.1422 27.5 20C27.5 16.5413 25.1588 13.6295 21.9748 12.7627M8.02522 12.7627C4.84117 13.6295 2.5 16.5413 2.5 20C2.5 24.1421 5.85786 27.5 10 27.5C14.1421 27.5 17.5 24.1421 17.5 20C17.5 19.0244 17.3137 18.0923 16.9748 17.2373M22.5 10C22.5 14.1421 19.1421 17.5 15 17.5C10.8579 17.5 7.5 14.1421 7.5 10C7.5 5.85786 10.8579 2.5 15 2.5C19.1421 2.5 22.5 5.85786 22.5 10Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p
                    style="color: #000; text-align: center; font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: normal">
                    효과</p>
            </button>
        </div>

        <div v-show="(isSecondFrameBarVisible || isSecondEffectBarVisible) && isBarVisible" class="bottom-bar-11">
            <button v-show="isSecondFrameBarVisible" @click="frameToggleBar">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <path d="M10.5 15.75L21 26.25L31.5 15.75" stroke="black" stroke-width="3" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
            <button v-show="isSecondEffectBarVisible" @click="effectToggleBar">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <path d="M10.5 15.75L21 26.25L31.5 15.75" stroke="black" stroke-width="3" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
            <button v-if="!isCapturing" @click="capture" class="capture-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="27" fill="white" stroke="#252525" stroke-width="5" />
                </svg>
            </button>
            <button v-if="isCapturing" @click="stopCapture" class="capture-button">
                <img src="../../assets/icon/round-close-button.png" alt="타이머 촬영 종료" style="width: auto; height: 40px" />
            </button>
        </div>

        <transition name="fade">
            <div v-show="isSecondFrameBarVisible && isBarVisible" class="bottom-bar-2">
                <div class="tab-container">
                    <button class="tab" v-for="tab in frameTabs" :key="tab.id"
                        :class="{ selected: selectedFrameTab === tab.id }" @click="selectFrameTab(tab.id)">
                        {{ tab.name }}
                    </button>
                </div>
                <div class="image-container">
                    <div class="image-view" v-for="image in frameList" :key="image.id">
                        <img :src="image.src" @click="selectImage(frameList, image.id)" class="frame-image" />
                        <img v-show="image.select" src="../../assets/icon/check-icon.png" alt="선택"
                            style="width: 40px; height: 40px; position: absolute; top: 25%; pointer-events: none" />
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-show="isSecondEffectBarVisible && isBarVisible" class="bottom-bar-2">
                <div class="tab-container">
                    <button class="tab" v-for="tab in effectTabs" :key="tab.id"
                        :class="{ selected: selectedEffectTab === tab.id }" @click="selectEffectTab(tab.id)">
                        {{ tab.name }}
                    </button>
                </div>
                <div class="image-container">
                    <div class="image-view" v-for="image in currentList" :key="image.id">
                        <img v-show="image.type !== 'STICKER'" :src="image.src" @click="selectImage(currentList, image.id)"
                            class="frame-image" />
                        <img v-show="image.type === 'STICKER'" :src="image.src"
                            @click="selectSticker(currentList, image.id)" class="frame-image" />
                        <img v-show="image.select && image.type !== 'STICKER'" src="../../assets/icon/check-icon.png"
                            alt="선택"
                            style="width: 40px; height: 40px; position: absolute; top: 25%; pointer-events: none" />
                    </div>
                </div>
            </div>
        </transition>
        <div class="block-bar2" v-show="isBarVisible"></div>
    </div>
</template>

<script>
import { ref, computed, inject, watch, provide } from "vue";
import { useStore } from "vuex";
import { EventBus } from "@/js/EventBus.js";

export default {
    name: "NavBar",
    props: ["frameList", "characterList", "stickerList", "filterList", "tabList", "isDecorate"],
    computed: {
        currentList: function () {
            switch (this.selectedEffectTab) {
                case 1:
                    return this.tabList;
                case 2:
                    return this.characterList;
                case 3:
                    return this.filterList;
                default:
                    return this.stickerList;
            }
        },
    },
    setup(props) {
        const { getters, dispatch } = useStore();
        const isBarVisible = ref(false);
        const isCapturing = ref(false);
        const exitModalVisible = ref(false);
        const isBeauty = ref(false);
        const arFrameSettingYn = ref("Y");
        const aspectRatio = ref(0);
        const isPhotoRatioSettingType = ref("BASIC");
        const isSecondFrameBarVisible = ref(false);
        const isSecondEffectBarVisible = ref(false);
        const arStickerSettingYn = ref("N");
        const arFilterSettingYn = ref("N");
        const arCharacterSettingYn = ref("N");
        const arTabSettingYn = ref("N");
        const tabMenuTitle = ref("축제");
        const timerButtonVisible = ref(1);
        const isFlipCamera = ref(true);

        const countdown = ref(null);
        const countdownInterval = ref(null);
        const stickerObjectList = ref([]);

        const flipCamera = inject("flipCamera");
        const toggleBeautyFilter = inject("toggleBeautyFilter");
        const selectFrameChange = inject("selectFrameChange");
        const selectCharacterChange = inject("selectCharacterChange");
        const selectTabChange = inject("selectTabChange");
        const selectFilterChange = inject("selectFilterChange");
        const selectStickerChange = inject("selectStickerChange");
        const setEventWrapperStyles = inject("setEventWrapperStyles");

        const frameTabs = ref([{ id: 1, name: "배경" }]);
        const effectTabs = ref([]);

        const selectedFrameTab = ref(1);
        const selectedEffectTab = ref(1);

        const getEffectTabs = () => {
            const tabs = [];
            if (arTabSettingYn.value === "Y" && !props.isDecorate) {
                tabs.push({ id: 1, name: tabMenuTitle.value });
            }
            if (arCharacterSettingYn.value === "Y") {
                tabs.push({ id: 2, name: "캐릭터" });
            }
            if (arFilterSettingYn.value === "Y" && !props.isDecorate) {
                tabs.push({ id: 3, name: "필터" });
            }
            if (arStickerSettingYn.value === "Y") {
                tabs.push({ id: 4, name: "스티커" });
            }
            selectedEffectTab.value = tabs[0].id;
            return tabs;
        };

        const selectFrameTab = (tabId) => {
            selectedFrameTab.value = tabId;
        };

        const selectEffectTab = (tabId) => {
            selectedEffectTab.value = tabId;
        };

        const toggleBarVisibility = () => {
            isBarVisible.value = !isBarVisible.value;

            arFrameSettingYn.value = getters["eventData/arFrameSettingYn"];
            isPhotoRatioSettingType.value = getters["eventData/photoRatioSettingType"];
            arStickerSettingYn.value = getters["eventData/arStickerSettingYn"];
            arFilterSettingYn.value = getters["eventData/arFilterSettingYn"];
            arCharacterSettingYn.value = getters["eventData/arCharacterSettingYn"];
            arTabSettingYn.value = getters["eventData/photoTabMenuAddSettingYn"];
            tabMenuTitle.value = getters["eventData/tabMenuTitle"];
            effectTabs.value = getEffectTabs();

            aspectRatio.value = 0;
        };

        const secondToggleBarVisibility = () => {
            isBarVisible.value = !isBarVisible.value;
            aspectRatio.value = 0;
        };

        const toggleAspectRatio = () => {
            aspectRatio.value = (aspectRatio.value + 1) % 3;
            if (aspectRatio.value === 0) {
                setEventWrapperStyles(4, 6);
            } else if (aspectRatio.value === 1) {
                setEventWrapperStyles(1, 1);
            } else if (aspectRatio.value === 2) {
                setEventWrapperStyles(814, 1218);
            }
        };

        const frameToggleBar = () => {
            isSecondFrameBarVisible.value = !isSecondFrameBarVisible.value;
            triggerAnimation();
        };
        const effectToggleBar = () => {
            isSecondEffectBarVisible.value = !isSecondEffectBarVisible.value;
            triggerAnimation();
        };

        function triggerAnimation() {
            const images = document.querySelectorAll(".bottom-bar-1 button svg");

            images.forEach((img) => {
                img.classList.add("animate-svg");

                img.addEventListener("animationend", () => {
                    img.classList.remove("animate-svg");
                });
            });
        }

        const selectImage = (images, imageId) => {
            if (isSecondFrameBarVisible.value) {
                images.forEach((image) => {
                    image.select = false;
                });
            }
            const selectedImage = images.find((image) => image.id === imageId);

            if (selectedImage && selectedImage.type !== "FILTER") {
                selectedImage.select = selectedImage.select ? false : true;
            }

            if (selectedImage && selectedImage.type === "FILTER") {
                images.forEach((image) => {
                    if (image.id !== imageId) {
                        image.select = false;
                    } else {
                        if (image.select) {
                            image.select = false;
                        } else {
                            image.select = true;
                        }
                    }
                });
            }
        };

        let idCounter = 0;
        const selectSticker = (stickers, stickerId) => {
            let sticker = stickers.find((sticker) => sticker.id === stickerId);
            if (sticker) {
                let newSticker = { ...sticker, id: idCounter++ };
                stickerObjectList.value.push(newSticker);
            }
        };

        const exit = () => {
            if (props.isDecorate) {
                dispatch("url/redirectToPhotoBox");
            } else {
                dispatch("url/redirectToMain");
            }

            return;
        };

        const toggleTimer = () => {
            timerButtonVisible.value = (timerButtonVisible.value + 1) % 5;
            if (timerButtonVisible.value === 0) {
                timerButtonVisible.value = 1;
            }
        };

        const capture = () => {
            if (timerButtonVisible.value === 0 || timerButtonVisible.value === 1) {
                // No timer, just capture immediately
                captureImage();
            } else {
                isCapturing.value = true;
                countdown.value = [0, 0, 3, 5, 7][timerButtonVisible.value];
                countdownInterval.value = setInterval(() => {
                    countdown.value -= 1;
                    if (countdown.value <= 0) {
                        captureImage();
                        stopCapture();
                    }
                }, 1000);
            }
        };

        const stopCapture = () => {
            clearInterval(countdownInterval.value);
            isCapturing.value = false;
        };

        const captureing = inject("captureing");

        const captureImage = () => {
            if (isCapturing.value || timerButtonVisible.value === 0 || timerButtonVisible.value === 1) {
                captureing();
            }
        };

        const toggleBottomBar = () => {
            if (isSecondFrameBarVisible.value || isSecondEffectBarVisible.value) {
                isSecondFrameBarVisible.value = false;
                isSecondEffectBarVisible.value = false;
            }
            EventBus.emit("toggleBottomBar");
        };

        provide("toggleBottomBar", toggleBottomBar);

        watch(isBeauty, () => {
            toggleBeautyFilter(isBeauty.value);
        });

        watch(
            () => props.frameList,
            () => {
                let selectedItems = props.frameList.filter((item) => item.select === true);
                let selectedIds = selectedItems.map((item) => item.id);
                selectFrameChange(selectedIds);
            },
            { deep: true }
        );
        watch(
            () => props.characterList,
            () => {
                let selectedItems = props.characterList.filter((item) => item.select === true);
                let selectedIds = selectedItems.map((item) => item.id);
                selectCharacterChange(selectedIds);
            },
            { deep: true }
        );
        watch(
            () => props.tabList,
            () => {
                let selectedItems = props.tabList.filter((item) => item.select === true);
                let selectedIds = selectedItems.map((item) => {
                    if (item.type === "PARTICLE" || item.type === "FILTER") {
                        return item.name;
                    } else {
                        return item.id;
                    }
                });
                selectTabChange(selectedIds);
            },
            { deep: true }
        );
        watch(
            () => props.filterList,
            () => {
                let selectedItems = props.filterList.filter((item) => item.select === true);

                let selectedFileNames = selectedItems.map((item) => {
                    if (item.file && item.file.includes(".json")) {
                        return item.file;
                    } else {
                        return item.name;
                    }
                });
                selectFilterChange(selectedFileNames);
            },
            { deep: true }
        );

        watch(
            stickerObjectList,
            () => {
                selectStickerChange(stickerObjectList.value);
            },
            { deep: true }
        );

        watch(
            isFlipCamera,
            () => {
                if (isFlipCamera.value === false) {
                    let selectedItems = props.filterList.filter((item) => item.file && item.file.endsWith(".json"));
                    selectedItems.forEach((item) => {
                        item.select = false;
                    });
                }
            },
            { deep: true }
        );

        const setSticker = ref(null);

        EventBus.on("setSticker", (id) => {
            setSticker.value = id;
        });

        EventBus.on("deleteStickerItem", () => {
            const index = stickerObjectList.value.findIndex((sticker) => sticker.id === setSticker.value);
            stickerObjectList.value.splice(index, 1);
        });

        const frameButtonStyle = computed(() => ({
            color: arFrameSettingYn.value === "Y" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
        }));

        var timeout = 60000;
        var checkInterval = 10000;

        function checkNetwork() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://go.selpic.co.kr/skapi/order/" + "0000", true);
            xhr.timeout = timeout;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("network ok");
                    } else {
                        alert("네트워크 환경이 원할하지 않습니다. 잠시 후 다시 이용해 주세요");
                        dispatch("url/redirectToMain");
                        return;
                    }
                }
            };

            xhr.ontimeout = function () {
                alert("네트워크 환경이 원할하지 않습니다. 잠시 후 다시 이용해 주세요");
                dispatch("url/redirectToMain");
                return;
            };

            xhr.onerror = function () {
                alert("네트워크 환경이 원할하지 않습니다. 잠시 후 다시 이용해 주세요");
                dispatch("url/redirectToMain");
                return;
            };

            xhr.send();
        }
        setInterval(checkNetwork, checkInterval);

        return {
            frameButtonStyle,
            toggleBarVisibility,
            isBarVisible,
            isCapturing,
            flipCamera,
            exitModalVisible,
            exit,
            isBeauty,
            arFrameSettingYn,
            aspectRatio,
            toggleAspectRatio,
            frameToggleBar,
            effectToggleBar,
            isSecondFrameBarVisible,
            isSecondEffectBarVisible,
            toggleTimer,
            capture,
            stopCapture,
            timerButtonVisible,
            countdown,
            frameTabs,
            effectTabs,
            selectedFrameTab,
            selectedEffectTab,
            selectFrameTab,
            selectEffectTab,
            selectImage,
            selectSticker,
            isFlipCamera,
            secondToggleBarVisibility,
        };
    },
};
</script>

<style scoped>
.NavBar {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: #fff;
}

.frame-image {
    width: 100%;
    height: 100%;
}

.top-bar {
    position: absolute;
    width: 100%;
    height: 8vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "aspect timer flip beauty exit";
    color: #fff;
}

.flip-button {
    grid-area: flip;
}

.beauty-button {
    grid-area: beauty;
}

.exit-button {
    grid-area: exit;
}

.aspect-button {
    grid-area: aspect;
}

.timer-button {
    grid-area: timer;
}

.bottom-bar-1 {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 15vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "frame capture effect";
    background-color: #fff;
    bottom: 0vh;
}

.block-bar2 {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 8vh;
    bottom: 0vh;
    pointer-events: none;
    background-color: #fff;
}

.bottom-bar-11 {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 9vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "frame capture effect";
    bottom: 0vh;
    background-color: #fff;
}

.frame-button {
    grid-area: frame;
}

.capture-button {
    grid-area: capture;
}

.effect-button {
    grid-area: effect;
}

.bottom-bar-2 {
    z-index: 1;
    position: absolute;
    width: 100%;
    display: flex;
    color: #fff;
    justify-content: space-around;
    align-items: center;
    bottom: 9vh;
    flex-direction: column;
    background-color: #fff;
    padding-bottom: 1vh;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(110%);
    transform-origin: bottom;
}

.fade-enter-active,
.fade-leave-active {
    transition: transform 0.5s ease-in-out;
}

.fade-enter-to,
.fade-leave-from {
    transform: translateY(0%);
    transform-origin: bottom;
}

@keyframes svg-scale-down {
    0% {
        transform: scale(2);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes svg-scale-up {
    0% {
        transform: scale(0.5);
    }

    100% {
        transform: scale(1);
    }
}

.animate-svg {
    animation: svg-scale-up 0.5s ease-out;
}

.bottom-bar-11 button svg {
    animation: svg-scale-down 0.5s ease-out;
}

.image-container {
    display: flex;
    overflow-x: auto;
    width: 100%;
    gap: 2%;
    margin-left: 3.5%;
}

.image-container::-webkit-scrollbar {
    height: 1%;
}

.image-view {
    position: relative;
    flex: 0 0 auto;
    width: 18.7%;
    height: 11.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
}

.image-view>span {
    white-space: nowrap;
    max-width: 100%;
    font-size: 0.9rem;
}

.tab-container {
    display: flex;
    width: 100%;
    gap: 9%;
    margin-left: 5.5%;
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
    overflow-x: auto;
}

.tab.selected {
    color: #000000;
}

.tab {
    font-size: 14px;
    color: #a6a6a6;
}

.countdown {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10em;
    color: #fff;
    z-index: 2;
}

.modal {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content2 {
    position: relative;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 20px;
    width: 88%;
    height: 40vh;
    background-color: #fff;
    color: #000;
    text-align: center;
    font-family: NanumSquare Neo OTF;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
}

.round-button {
    display: inline-block;
    border-radius: 24px;
    width: 49%;
    height: 6vh;
    border: 1px solid var(--black-50, #757575);
    background-color: #fff;
    color: #000;
    color: var(--black, #111);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 0%;
}

.round-button2 {
    display: inline-block;
    border-radius: 24px;
    width: 49%;
    height: 6vh;
    background-color: #000;
    color: #fff;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 0%;
}

.button-container2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>

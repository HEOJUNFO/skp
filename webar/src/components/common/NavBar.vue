<template>
    <div class="NavBar">
        <div v-if="isCapturing" class="countdown">{{ countdown }}
        </div>
        <div v-if="exitModalVisible" class="modal">
            <div class="modal-content2">
                <p>AR포토를 종료하고 메인페이지로</p>
                <p>이동합니다.</p>
                <div class="button-container2">
                    <button class="round-button" @click="exit">나가기</button>
                    <button class="round-button" @click="exitModalVisible = false">취소</button>
                </div>
            </div>
        </div>
        <div class="top-bar" v-show="isBarVisible" style="background-color: white; ">
            <button v-if="!isCapturing && arFrameSettingYn === 'N'" @click="toggleAspectRatio" class="aspect-button">
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
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
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
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
                        비율</p>
                </div>
                <div v-if="aspectRatio === 2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_13_30)">
                            <rect width="32" height="32" fill="white" />
                            <path
                                d="M23 1H9C6.19974 1 4.79961 1 3.73005 1.54497C2.78924 2.02433 2.02433 2.78924 1.54497 3.73005C1 4.79961 1 6.19974 1 9V23C1 25.8003 1 27.2004 1.54497 28.27C2.02433 29.2108 2.78924 29.9757 3.73005 30.455C4.79961 31 6.19974 31 9 31H23C25.8003 31 27.2004 31 28.27 30.455C29.2108 29.9757 29.9757 29.2108 30.455 28.27C31 27.2004 31 25.8003 31 23V9C31 6.19974 31 4.79961 30.455 3.73005C29.9757 2.78924 29.2108 2.02433 28.27 1.54497C27.2004 1 25.8003 1 23 1Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M8.0428 15.006C8.0428 14.742 7.98413 14.5147 7.8668 14.324C7.7568 14.126 7.6028 13.9757 7.4048 13.873C7.21413 13.763 6.9978 13.708 6.7558 13.708C6.50647 13.708 6.2828 13.763 6.0848 13.873C5.89413 13.9757 5.74013 14.126 5.6228 14.324C5.5128 14.5147 5.4578 14.742 5.4578 15.006C5.4578 15.2627 5.5128 15.49 5.6228 15.688C5.74013 15.886 5.89413 16.04 6.0848 16.15C6.2828 16.26 6.50647 16.315 6.7558 16.315C6.9978 16.315 7.21413 16.26 7.4048 16.15C7.6028 16.04 7.7568 15.886 7.8668 15.688C7.98413 15.49 8.0428 15.2627 8.0428 15.006ZM6.7668 19.967H4.4128L6.9098 17.184L7.2838 17.019C7.07847 17.217 6.88047 17.349 6.6898 17.415C6.50647 17.4737 6.27547 17.503 5.9968 17.503C5.7108 17.503 5.4248 17.448 5.1388 17.338C4.86013 17.2207 4.60713 17.0557 4.3798 16.843C4.15247 16.623 3.96913 16.359 3.8298 16.051C3.69047 15.743 3.6208 15.3947 3.6208 15.006C3.6208 14.368 3.76013 13.8363 4.0388 13.411C4.3248 12.9857 4.70247 12.6667 5.1718 12.454C5.64847 12.234 6.17647 12.124 6.7558 12.124C7.3278 12.124 7.84847 12.234 8.3178 12.454C8.79447 12.6667 9.17213 12.9857 9.4508 13.411C9.7368 13.8363 9.8798 14.368 9.8798 15.006C9.8798 15.4167 9.7918 15.798 9.6158 16.15C9.44713 16.502 9.23813 16.832 8.9888 17.14L6.7668 19.967ZM11.1662 19.252C11.1662 18.9733 11.2652 18.735 11.4632 18.537C11.6612 18.339 11.9069 18.24 12.2002 18.24C12.5082 18.24 12.7575 18.339 12.9482 18.537C13.1389 18.735 13.2342 18.9733 13.2342 19.252C13.2342 19.5307 13.1389 19.769 12.9482 19.967C12.7575 20.165 12.5082 20.264 12.2002 20.264C11.9069 20.264 11.6612 20.165 11.4632 19.967C11.2652 19.769 11.1662 19.5307 11.1662 19.252ZM11.1662 15.138C11.1662 14.8593 11.2652 14.621 11.4632 14.423C11.6612 14.225 11.9069 14.126 12.2002 14.126C12.5082 14.126 12.7575 14.225 12.9482 14.423C13.1389 14.621 13.2342 14.8593 13.2342 15.138C13.2342 15.4167 13.1389 15.6587 12.9482 15.864C12.7575 16.062 12.5082 16.161 12.2002 16.161C11.9069 16.161 11.6612 16.062 11.4632 15.864C11.2652 15.6587 11.1662 15.4167 11.1662 15.138ZM14.7221 14.522V12.905L18.4181 12.157V20H16.6251V14.049L14.7221 14.522ZM21.9578 17.294C21.9578 17.558 22.0128 17.789 22.1228 17.987C22.2401 18.1777 22.3941 18.328 22.5848 18.438C22.7828 18.5407 23.0065 18.592 23.2558 18.592C23.4978 18.592 23.7141 18.5407 23.9048 18.438C24.1028 18.328 24.2568 18.1777 24.3668 17.987C24.4841 17.789 24.5428 17.558 24.5428 17.294C24.5428 17.0373 24.4841 16.81 24.3668 16.612C24.2568 16.414 24.1028 16.26 23.9048 16.15C23.7141 16.04 23.4978 15.985 23.2558 15.985C23.0065 15.985 22.7828 16.04 22.5848 16.15C22.3941 16.26 22.2401 16.414 22.1228 16.612C22.0128 16.81 21.9578 17.0373 21.9578 17.294ZM23.2338 12.333H25.5878L23.1018 15.116L22.7168 15.281C22.9221 15.0757 23.1165 14.9437 23.2998 14.885C23.4905 14.8263 23.7251 14.797 24.0038 14.797C24.2898 14.797 24.5721 14.8557 24.8508 14.973C25.1368 15.083 25.3935 15.248 25.6208 15.468C25.8555 15.6807 26.0388 15.941 26.1708 16.249C26.3101 16.557 26.3798 16.9053 26.3798 17.294C26.3798 17.9247 26.2368 18.4563 25.9508 18.889C25.6721 19.3143 25.2945 19.637 24.8178 19.857C24.3485 20.0697 23.8278 20.176 23.2558 20.176C22.6765 20.176 22.1485 20.0697 21.6718 19.857C21.2025 19.637 20.8248 19.3143 20.5388 18.889C20.2601 18.4563 20.1208 17.9247 20.1208 17.294C20.1208 16.8833 20.2051 16.502 20.3738 16.15C20.5498 15.798 20.7625 15.468 21.0118 15.16L23.2338 12.333Z"
                                fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13_30">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
                        비율</p>
                </div>
                <div v-if="aspectRatio === 3">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_13_25)">
                            <rect width="32" height="32" fill="white" />
                            <path
                                d="M23 1H9C6.19974 1 4.79961 1 3.73005 1.54497C2.78924 2.02433 2.02433 2.78924 1.54497 3.73005C1 4.79961 1 6.19974 1 9V23C1 25.8003 1 27.2004 1.54497 28.27C2.02433 29.2108 2.78924 29.9757 3.73005 30.455C4.79961 31 6.19974 31 9 31H23C25.8003 31 27.2004 31 28.27 30.455C29.2108 29.9757 29.9757 29.2108 30.455 28.27C31 27.2004 31 25.8003 31 23V9C31 6.19974 31 4.79961 30.455 3.73005C29.9757 2.78924 29.2108 2.02433 28.27 1.54497C27.2004 1 25.8003 1 23 1Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M8.48496 13.895V12.3H11.928V13.895H8.48496ZM8.48496 16.909V15.413H11.818V16.909H8.48496ZM7.25296 12.3H9.03497V20H7.25296V12.3ZM14.6912 18.02C14.6912 18.3133 14.7462 18.5443 14.8562 18.713C14.9662 18.8743 15.1569 18.955 15.4282 18.955C15.6115 18.955 15.7655 18.9183 15.8902 18.845C16.0222 18.7717 16.1249 18.6653 16.1982 18.526C16.2715 18.3867 16.3082 18.218 16.3082 18.02V14.94H17.9692V20H16.3082V19.241C16.1542 19.5123 15.9525 19.7287 15.7032 19.89C15.4539 20.044 15.1422 20.121 14.7682 20.121C14.1375 20.121 13.6755 19.9523 13.3822 19.615C13.0962 19.2703 12.9532 18.7973 12.9532 18.196V14.94H14.6912V18.02ZM19.2803 11.42H20.9523V20H19.2803V11.42ZM22.2452 11.42H23.9172V20H22.2452V11.42Z"
                                fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13_25">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
                        비율</p>
                </div>
                <span v-show="aspectRatio === 4">
                    <img src="../../assets/icon/print-button.png" alt="프린트" style="width: 30px; height: 30px;" />
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
                        비율</p>
                </span>
            </button>
            <button v-if="timerButtonVisible && !isCapturing" @click="toggleTimer" class="timer-button">
                <span v-if="timerButtonVisible === 2" style="font-size: 36px; font-weight: bold; color:black">3</span>
                <span v-else-if="timerButtonVisible === 3" style="font-size: 36px; font-weight: bold;  color:black">5</span>
                <span v-else-if="timerButtonVisible === 4" style="font-size: 36px; font-weight: bold;  color:black">7</span>
                <div v-else-if="timerButtonVisible === 1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path
                            d="M16 12.6667V18L19.3333 20M16 6.66666C9.74073 6.66666 4.66663 11.7408 4.66663 18C4.66663 24.2592 9.74073 29.3333 16 29.3333C22.2592 29.3333 27.3333 24.2592 27.3333 18C27.3333 11.7408 22.2592 6.66666 16 6.66666ZM16 6.66666V2.66666M13.3333 2.66666H18.6666M27.1053 7.45604L25.1053 5.45604L26.1053 6.45604M4.89465 7.45604L6.89465 5.45604L5.89465 6.45604"
                            stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p
                        style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
                        타이머</p>
                </div>
            </button>
            <button @click="flipCamera(), isFlipCamera = !isFlipCamera" class="flip-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <path
                        d="M35.7927 22.5628C35.3066 27.1301 32.7187 31.4102 28.4364 33.8825C21.3218 37.9901 12.2244 35.5525 8.11682 28.4379L7.67932 27.6801M6.20573 19.4373C6.69188 14.8699 9.27976 10.5899 13.562 8.11758C20.6766 4.00996 29.774 6.4476 33.8816 13.5622L34.3191 14.32M6.11304 31.6156L7.39413 26.8345L12.1752 28.1156M29.8242 13.8845L34.6053 15.1656L35.8864 10.3845"
                        stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button v-if="!isCapturing && !isBeauty" @click="isBeauty = true" class="beauty-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                        d="M5.99996 29.3334V22.6667M5.99996 9.33335V2.66669M2.66663 6.00002H9.33329M2.66663 26H9.33329M17.3333 4.00002L15.0211 10.0118C14.645 10.9895 14.457 11.4783 14.1647 11.8895C13.9055 12.2539 13.5872 12.5723 13.2227 12.8314C12.8116 13.1238 12.3227 13.3118 11.3451 13.6878L5.33329 16L11.3451 18.3123C12.3227 18.6883 12.8116 18.8763 13.2227 19.1686C13.5872 19.4278 13.9055 19.7462 14.1647 20.1106C14.457 20.5217 14.645 21.0106 15.0211 21.9882L17.3333 28L19.6455 21.9882C20.0215 21.0106 20.2096 20.5217 20.5019 20.1106C20.761 19.7462 21.0794 19.4278 21.4438 19.1686C21.855 18.8763 22.3438 18.6883 23.3215 18.3123L29.3333 16L23.3215 13.6878C22.3438 13.3118 21.855 13.1238 21.4438 12.8314C21.0794 12.5723 20.761 12.2539 20.5019 11.8895C20.2096 11.4783 20.0215 10.9895 19.6455 10.0118L17.3333 4.00002Z"
                        stroke="#252525" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <p
                    style="color: rgba(0, 0, 0, 0.50); text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
                    뷰티</p>
            </button>
            <button v-if="!isCapturing && isBeauty" @click="isBeauty = false" class="beauty-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                        d="M5.99996 29.3333V22.6667M5.99996 9.33332V2.66666M2.66663 5.99999H9.33329M2.66663 26H9.33329M17.3333 3.99999L15.0211 10.0118C14.645 10.9894 14.457 11.4783 14.1647 11.8894C13.9055 12.2539 13.5872 12.5722 13.2227 12.8314C12.8116 13.1237 12.3227 13.3117 11.3451 13.6878L5.33329 16L11.3451 18.3122C12.3227 18.6882 12.8116 18.8763 13.2227 19.1686C13.5872 19.4277 13.9055 19.7461 14.1647 20.1105C14.457 20.5217 14.645 21.0105 15.0211 21.9882L17.3333 28L19.6455 21.9882C20.0215 21.0105 20.2096 20.5217 20.5019 20.1105C20.761 19.7461 21.0794 19.4277 21.4438 19.1686C21.855 18.8763 22.3438 18.6882 23.3215 18.3122L29.3333 16L23.3215 13.6878C22.3438 13.3117 21.855 13.1237 21.4438 12.8314C21.0794 12.5722 20.761 12.2539 20.5019 11.8894C20.2096 11.4783 20.0215 10.9894 19.6455 10.0118L17.3333 3.99999Z"
                        stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p
                    style="color: #000; text-align: center; font-family: Inter; font-size: 10px; font-style: normal; font-weight: 400; line-height: normal;">
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
        <div v-show="!isSecondFrameBarVisible && !isSecondEffectBarVisible && isBarVisible" class="bottom-bar-1"
            :style="bottombarStyle">
            <button v-if="!isCapturing && arFrameSettingYn === 'Y'" @click="frameToggleBar" class="frame-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                        d="M5 13C5 10.1997 5 8.79961 5.54497 7.73005C6.02433 6.78924 6.78924 6.02433 7.73005 5.54497C8.79961 5 10.1997 5 13 5H27C29.8003 5 31.2004 5 32.27 5.54497C33.2108 6.02433 33.9757 6.78924 34.455 7.73005C35 8.79961 35 10.1997 35 13V27C35 29.8003 35 31.2004 34.455 32.27C33.9757 33.2108 33.2108 33.9757 32.27 34.455C31.2004 35 29.8003 35 27 35H13C10.1997 35 8.79961 35 7.73005 34.455C6.78924 33.9757 6.02433 33.2108 5.54497 32.27C5 31.2004 5 29.8003 5 27V13Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 15.8333L10 25H30L22.5 12.5L18.3333 18.3333L15 15.8333Z" stroke="black" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p style="color: #000; text-align: center; font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: normal;"
                    :style="frameButtonStyle">배경</p>
            </button>
            <button v-if="!isCapturing" @click="capture" class="capture-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 86 86" fill="none">
                    <circle cx="43" cy="43" r="40" fill="white" stroke="#252525" stroke-width="5" />
                </svg>
            </button>
            <button v-if="isCapturing" @click="stopCapture" class="capture-button">
                <img src="../../assets/icon/round-close-button.png" alt="타이머 촬영 종료" style="width: 50px; height: 50px;  " />
            </button>
            <button v-if="!isCapturing" @click="effectToggleBar" class="effect-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path
                        d="M15 25.5903C16.3269 26.7779 18.0791 27.5 20 27.5C24.1421 27.5 27.5 24.1422 27.5 20C27.5 16.5413 25.1588 13.6295 21.9748 12.7627M8.02522 12.7627C4.84117 13.6295 2.5 16.5413 2.5 20C2.5 24.1421 5.85786 27.5 10 27.5C14.1421 27.5 17.5 24.1421 17.5 20C17.5 19.0244 17.3137 18.0923 16.9748 17.2373M22.5 10C22.5 14.1421 19.1421 17.5 15 17.5C10.8579 17.5 7.5 14.1421 7.5 10C7.5 5.85786 10.8579 2.5 15 2.5C19.1421 2.5 22.5 5.85786 22.5 10Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p
                    style="color: #000; text-align: center; font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: normal;">
                    효과</p>
            </button>
        </div>

        <div v-show="(isSecondFrameBarVisible || isSecondEffectBarVisible) && isBarVisible" class="bottom-bar-11"
            :style="barStyle">
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
                <img src="../../assets/icon/round-close-button.png" alt="타이머 촬영 종료" style="width: auto; height: 40px; " />
            </button>
        </div>

        <transition name="fade">
            <div v-show="isSecondFrameBarVisible && isBarVisible" class="bottom-bar-2" :style="barStyle2">
                <div class="tab-container">
                    <button class="tab" v-for="tab in frameTabs" :key="tab.id"
                        :class="{ selected: selectedFrameTab === tab.id }" @click="selectFrameTab(tab.id)">{{ tab.name
                        }}</button>
                </div>
                <div class="image-container">
                    <div class="image-view" v-for="image in frameList" :key="image.id">
                        <img :src="image.src" @click="selectImage(frameList, image.id)" class="frame-image" />
                        <img v-show="image.select" src="../../assets/icon/check-icon.png" alt="선택"
                            style="width: 40px; height: 40px; position: absolute; top: 25%; pointer-events: none;" />
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-show="isSecondEffectBarVisible && isBarVisible" class="bottom-bar-2" :style="barStyle2">
                <div class="tab-container">
                    <button class="tab" v-for="tab in effectTabs" :key="tab.id"
                        :class="{ selected: selectedEffectTab === tab.id }" @click="selectEffectTab(tab.id)">{{ tab.name
                        }}</button>
                </div>
                <div class="image-container">
                    <div class="image-view" v-for="image in currentList" :key="image.id">
                        <img v-show="image.type !== 'STICKER'" :src="image.src" @click="selectImage(currentList, image.id)"
                            class="frame-image" />
                        <img v-show="image.type === 'STICKER'" :src="image.src"
                            @click="selectSticker(currentList, image.id)" class="frame-image" />
                        <img v-show="image.select && image.type !== 'STICKER'" src="../../assets/icon/check-icon.png"
                            alt="선택"
                            style="width: 40px; height: 40px; position: absolute; top: 25%; pointer-events: none;" />
                    </div>
                </div>
            </div>
        </transition>
        <div class="block-bar" v-show="isBarVisible" :style="blockbarStyle"></div>
        <div class="block-bar2" v-show="isBarVisible" :style="blockbarStyle2"></div>
    </div>
</template>
  
<script>

import { ref, computed, inject, watch, provide } from "vue";
import { useStore } from "vuex";
import { EventBus } from "@/js/EventBus.js";

export default {
    name: "NavBar",
    props: ['frameList', 'characterList', 'stickerList', 'filterList', 'tabList'],
    computed: {
        currentList: function () {
            switch (this.selectedEffectTab) {
                case 1: return this.tabList;
                case 2: return this.characterList;
                case 3: return this.filterList;
                default: return this.stickerList;
            }
        }
    },
    setup(props) {
        const { getters, dispatch } = useStore();
        const isBarVisible = ref(false);
        const isCapturing = ref(false);
        const exitModalVisible = ref(false);
        const isBeauty = ref(false);
        const arFrameSettingYn = ref('Y');
        const aspectRatio = ref(0);
        const aspectRatioValue = ref('1 / 1');
        const isPhotoRatioSettingType = ref('BASIC');
        const isSecondFrameBarVisible = ref(false);
        const isSecondEffectBarVisible = ref(false);
        const arStickerSettingYn = ref('N');
        const arFilterSettingYn = ref('N');
        const arCharacterSettingYn = ref('N');
        const arTabSettingYn = ref('N');
        const tabMenuTitle = ref('축제');
        const timerButtonVisible = ref(1);
        const isFlipCamera = ref(true);

        const countdown = ref(null);
        const countdownInterval = ref(null);
        const stickerObjectList = ref([]);

        const frameTabs = ref([
            { id: 1, name: '배경' },
        ]);
        const effectTabs = ref([]);

        const selectedFrameTab = ref(1);
        const selectedEffectTab = ref(1);

        const getEffectTabs = () => {
            const tabs = [];
            if (arTabSettingYn.value === 'Y') {
                tabs.push({ id: 1, name: tabMenuTitle.value });
            }
            if (arCharacterSettingYn.value === 'Y') {
                tabs.push({ id: 2, name: '캐릭터' });
            }
            if (arFilterSettingYn.value === 'Y') {
                tabs.push({ id: 3, name: '필터' });
            }
            if (arStickerSettingYn.value === 'Y') {
                tabs.push({ id: 4, name: '스티커' });
            }
            selectedEffectTab.value = tabs[0].id;
            return tabs;
        }

        const selectFrameTab = (tabId) => {
            selectedFrameTab.value = tabId;
        }

        const selectEffectTab = (tabId) => {
            selectedEffectTab.value = tabId;
        }

        const toggleBarVisibility = () => {
            isBarVisible.value = !isBarVisible.value;

            arFrameSettingYn.value = getters['eventData/arFrameSettingYn'];
            isPhotoRatioSettingType.value = getters['eventData/photoRatioSettingType'];
            arStickerSettingYn.value = getters['eventData/arStickerSettingYn'];
            arFilterSettingYn.value = getters['eventData/arFilterSettingYn'];
            arCharacterSettingYn.value = getters['eventData/arCharacterSettingYn'];
            arTabSettingYn.value = getters['eventData/photoTabMenuAddSettingYn'];
            tabMenuTitle.value = getters['eventData/tabMenuTitle'];
            effectTabs.value = getEffectTabs();

            aspectRatio.value = 0;
            aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '6 / 4' : '16 / 9';
        }

        const secondToggleBarVisibility = () => {
            isBarVisible.value = !isBarVisible.value;
            aspectRatio.value = 0;
            aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '6 / 4' : '16 / 9';
        }

        const toggleAspectRatio = () => {
            aspectRatio.value = (aspectRatio.value + 1) % 5
            if (aspectRatio.value === 0) {
                aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '6 / 4' : '16 / 9';
            } else if (aspectRatio.value === 1) {
                aspectRatioValue.value = '1 / 1'
            } else if (aspectRatio.value === 2) {
                aspectRatioValue.value = '16 / 9'
            } else if (aspectRatio.value === 3) {
                aspectRatioValue.value = '2 / 1'
            } else if (aspectRatio.value === 4) {
                aspectRatioValue.value = '1218 / 814'
            }
        };

        watch(aspectRatioValue, () => {
            if (arFrameSettingYn.value === 'N') {
                window.parent.adjustSizeToRatio(aspectRatioValue.value);
            }
        }, { deep: true, immediate: true });

        const frameToggleBar = () => {
            isSecondFrameBarVisible.value = !isSecondFrameBarVisible.value;
            triggerAnimation();
        }
        const effectToggleBar = () => {
            isSecondEffectBarVisible.value = !isSecondEffectBarVisible.value;
            triggerAnimation();
        }

        function triggerAnimation() {
            const images = document.querySelectorAll(".bottom-bar-1 button svg");

            images.forEach((img) => {
                img.classList.add("animate-svg");

                img.addEventListener('animationend', () => {
                    img.classList.remove("animate-svg");
                });
            });
        }

        const selectImage = (images, imageId) => {
            if (isSecondFrameBarVisible.value) {
                images.forEach(image => {
                    image.select = false;
                });
            }
            const selectedImage = images.find(image => image.id === imageId);

            if (selectedImage && selectedImage.type !== 'FILTER') {
                selectedImage.select = selectedImage.select ? false : true;
            }

            if (selectedImage && selectedImage.type === 'FILTER') {
                images.forEach(image => {
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
        }

        let idCounter = 0;
        const selectSticker = (stickers, stickerId) => {
            let sticker = stickers.find(sticker => sticker.id === stickerId);
            if (sticker) {
                let newSticker = { ...sticker, id: idCounter++ };
                stickerObjectList.value.push(newSticker);
            }
        }

        const exit = () => {
            dispatch("url/redirectToMain");
            return
        };

        const toggleTimer = () => {
            timerButtonVisible.value = (timerButtonVisible.value + 1) % 5;
            if (timerButtonVisible.value === 0) {
                timerButtonVisible.value = 1;
            }
        }

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

        const captureing = inject('captureing');

        const captureImage = () => {
            if (isCapturing.value || timerButtonVisible.value === 0 || timerButtonVisible.value === 1) {
                captureing();
            }
        };

        const flipCamera = inject('flipCamera');
        const toggleBeautyFilter = inject('toggleBeautyFilter');
        const selectFrameChange = inject('selectFrameChange');
        const selectCharacterChange = inject('selectCharacterChange');
        const selectTabChange = inject('selectTabChange');
        const selectFilterChange = inject('selectFilterChange');
        const selectStickerChange = inject('selectStickerChange');

        const toggleBottomBar = () => {
            if (isSecondFrameBarVisible.value || isSecondEffectBarVisible.value) {
                isSecondFrameBarVisible.value = false;
                isSecondEffectBarVisible.value = false;
            }

        }

        provide('toggleBottomBar', toggleBottomBar);


        watch(isBeauty, () => {
            toggleBeautyFilter(isBeauty.value);
        });

        watch(() => props.frameList, () => {
            let selectedItems = props.frameList.filter(item => item.select === true);
            let selectedIds = selectedItems.map(item => item.id);
            selectFrameChange(selectedIds);
        }, { deep: true });
        watch(() => props.characterList, () => {
            let selectedItems = props.characterList.filter(item => item.select === true);
            let selectedIds = selectedItems.map(item => item.id);
            selectCharacterChange(selectedIds);
        }, { deep: true });
        watch(() => props.tabList, () => {
            let selectedItems = props.tabList.filter(item => item.select === true);
            let selectedIds = selectedItems.map(item => {
                if (item.type === 'PARTICLE' || item.type === "FILTER") {
                    return item.name;
                } else {
                    return item.id;
                }
            });
            selectTabChange(selectedIds);
        }, { deep: true });
        watch(() => props.filterList, () => {
            let selectedItems = props.filterList.filter(item => item.select === true);

            let selectedFileNames = selectedItems.map(item => {
                if (item.file && item.file.includes('.json')) {
                    return item.file;
                }
                else {
                    return item.name;
                }
            });
            selectFilterChange(selectedFileNames);
        }, { deep: true });

        watch(stickerObjectList, () => {
            selectStickerChange(stickerObjectList.value);
        }, { deep: true });

        watch(isFlipCamera, () => {
            if (isFlipCamera.value === false) {
                let selectedItems = props.filterList.filter(item => item.file && item.file.endsWith('.json'));
                selectedItems.forEach(item => {
                    item.select = false;
                });
            }
        }, { deep: true });

        const setSticker = ref(null)

        EventBus.on('setSticker', (id) => {
            setSticker.value = id;
        });

        EventBus.on('deleteStickerItem', () => {
            const index = stickerObjectList.value.findIndex(sticker => sticker.id === setSticker.value);
            stickerObjectList.value.splice(index, 1);
        });


        const frameStyle = computed(() => {
            if (arFrameSettingYn.value === 'N') {
                return {
                    aspectRatio: aspectRatioValue.value,
                };
            } else {
                return {};
            }
        });

        const bottombarStyle = computed(() => (
            {
                backgroundColor: aspectRatio.value === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
                bottom: aspectRatio.value === 3 ? '24vh' : aspectRatio.value === 2 ? '18vh' : '0vh',
                height: aspectRatio.value === 3 ? '24vh' : aspectRatio.value === 2 ? '9vh' : '24vh',
            }));

        const barStyle = computed(() => (
            {
                backgroundColor: aspectRatio.value === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
                bottom: aspectRatio.value === 3 ? '24vh' : aspectRatio.value === 2 ? '18vh' : '0vh',
            }));
        const barStyle2 = computed(() => ({
            backgroundColor: aspectRatio.value === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
            bottom: aspectRatio.value === 3 ? '31vh' : aspectRatio.value === 2 ? '25vh' : '7vh',
        }));
        const blockbarStyle = computed(() => ({
            backgroundColor: aspectRatio.value === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
        }));
        const blockbarStyle2 = computed(() => ({
            backgroundColor: aspectRatio.value === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
            height: aspectRatio.value === 3 ? '8vh' : aspectRatio.value === 2 ? '24vh' : '8vh',
        }));


        const frameButtonStyle = computed(() => ({
            color: arFrameSettingYn.value === 'Y' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)',
        }));

        return {
            frameStyle,
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
            barStyle,
            barStyle2,
            blockbarStyle,
            blockbarStyle2,
            bottombarStyle,
            secondToggleBarVisibility
        }
    }
}
</script>
  
<style scoped>
.NavBar {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: #f9f9f9;
}

.frame-image {
    width: 100%;
    height: 100%;
}

.top-bar {
    position: absolute;
    width: 100%;
    height: 14vh;
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
    height: 24vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "frame capture effect";
    background-color: #fff;
    bottom: 0vh;
}

.block-bar {
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 24vh;
    bottom: 0vh;
    pointer-events: none;
    background-color: #fff;
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
    height: 7.5vh;
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
    bottom: 7.5vh;
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
        transform: scale(2.0);
    }

    100% {
        transform: scale(1.0);
    }
}

@keyframes svg-scale-up {
    0% {
        transform: scale(0.5);
    }

    100% {
        transform: scale(1.0);

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

.button-container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    color: #fff;
}


.tab-container {
    display: flex;
    width: 100%;
    gap: 9%;
    margin-left: 5.5%;
    margin-top: 1vh;
    margin-bottom: 1vh;
    overflow-x: auto;
}

.tab.selected {
    color: #000000;
}

.tab {
    font-size: 14px;
    color: #A6A6A6;
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
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 500px;
    text-align: center;
    background-color: #fff;
    color: #000;
}


.round-button {
    display: inline-block;
    border-radius: 10px;
    width: 30%;
    height: 30px;

    border: 2px solid #000;
    background-color: #fff;
    color: #000;
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
}

.button-container2 {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>
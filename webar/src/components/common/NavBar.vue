<template>
    <div class="NavBar" :style="frameStyle">
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
                <span v-if="aspectRatio === 0" style="font-size: 30px; font-weight: bold;">4:6</span>
                <span v-else-if="aspectRatio === 1" style="font-size: 30px; font-weight: bold;">1:1</span>
                <span v-else-if="aspectRatio === 2" style="font-size: 30px; font-weight: bold;">9:16</span>
                <span v-else-if="aspectRatio === 3" style="font-size: 30px; font-weight: bold;">FUll</span>
                <span v-show="aspectRatio === 4">
                    <img src="../../assets/icon/print-button.png" alt="프린트" style="width: 30px; height: 30px;" />
                </span>
            </button>
            <button v-if="timerButtonVisible && !isCapturing" @click="toggleTimer" class="timer-button">
                <span v-if="timerButtonVisible === 2" style="font-size: 36px; font-weight: bold;">3</span>
                <span v-else-if="timerButtonVisible === 3" style="font-size: 36px; font-weight: bold;">5</span>
                <span v-else-if="timerButtonVisible === 4" style="font-size: 36px; font-weight: bold;">7</span>
                <span v-else-if="timerButtonVisible === 1" style="font-size: 36px; font-weight: bold;">
                    <img src="../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
                </span>
            </button>
            <button @click="flipCamera()" class="flip-button">
                <img src="../../assets/icon/right-left-button.png" alt="전환" style="width: 40px; height: 40px;  " />
            </button>
            <button v-if="!isCapturing && !isBeauty" @click="isBeauty = true" class="beauty-button">
                <img src="../../assets/icon/toggle-off-button.png" alt="뷰티off" style="width: 45px; height: 45px;  " />
            </button>
            <button v-if="!isCapturing && isBeauty" @click="isBeauty = false" class="beauty-button">
                <img src="../../assets/icon/toggle-on-button.png" alt="뷰티on" style="width: 45px; height: 45px; " />
            </button>
            <button v-if="!isCapturing" @click="exitModalVisible = true" class="exit-button">
                <img src="../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
            </button>
        </div>
        <slot></slot>
        <div v-show="!isSecondFrameBarVisible && !isSecondEffectBarVisible && isBarVisible" class="bottom-bar-1"
            :style="barStyle">
            <button v-if="!isCapturing && arFrameSettingYn === 'Y'" @click="frameToggleBar" class="frame-button">
                <img src="../../assets/icon/frame-button.png" alt="프레임" style="width: 40px; height: 40px; " />
                <p style="font-size: 17.5px; font-weight: bold; " :style="frameButtonStyle">배경</p>
            </button>
            <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture"
                class="capture-button">
                <img src="../../assets/icon/circle-button.png" alt="촬영" style="width: auto; height: 70px; " />
            </button>
            <button v-if="isCapturing" @click="stopCapture" class="capture-button">
                <img src="../../assets/icon/round-close-button.png" alt="타이머 촬영 종료" style="width: 50px; height: 50px;  " />
            </button>
            <button v-if="!isCapturing" @click="effectToggleBar" class="effect-button">
                <img src="../../assets/icon/star-button.png" alt="이펙트" style="width: 45px; height: 40px;  " />
                <p style="font-size: 17.5px; font-weight: bold; ">이펙트</p>
            </button>
        </div>

        <div v-show="(isSecondFrameBarVisible || isSecondEffectBarVisible) && isBarVisible" class="bottom-bar-11"
            :style="barStyle">
            <button v-show="isSecondFrameBarVisible" @click="frameToggleBar">
                <img src="../../assets/icon/bar-down-button.png" alt="내리기" style="width: auto; height: 35px;" />
            </button>
            <button v-show="isSecondEffectBarVisible" @click="effectToggleBar">
                <img src="../../assets/icon/bar-down-button.png" alt="내리기" style="width: auto; height: 35px;" />
            </button>
            <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture"
                class="capture-button">
                <img src="../../assets/icon/circle-button.png" alt="촬영" style="width: auto; height: 35px; " />
            </button>
            <button v-if="isCapturing" @click="stopCapture" class="capture-button">
                <img src="../../assets/icon/round-close-button.png" alt="타이머 촬영 종료" style="width: auto; height: 35px; " />
            </button>
        </div>

        <transition name="fade">
            <div v-if="isSecondFrameBarVisible && isBarVisible" class="bottom-bar-2" :style="barStyle">
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
                        <span>{{ image.name }}</span>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="isSecondEffectBarVisible && isBarVisible" class="bottom-bar-2" :style="barStyle">
                <div class="tab-container">
                    <button class="tab" v-for="tab in effectTabs" :key="tab.id"
                        :class="{ selected: selectedEffectTab === tab.id }" @click="selectEffectTab(tab.id)">{{ tab.name
                        }}</button>
                </div>
                <div class="image-container">
                    <div class="image-view" v-for="image in currentList" :key="image.id">
                        <img v-if="image.type !== 'STICKER'" :src="image.src" @click="selectImage(currentList, image.id)"
                            class="frame-image" />
                        <img v-if="image.type === 'STICKER'" :src="image.src" @click="selectSticker(currentList, image.id)"
                            class="frame-image" />
                        <img v-show="image.select && image.type !== 'STICKER'" src="../../assets/icon/check-icon.png"
                            alt="선택"
                            style="width: 40px; height: 40px; position: absolute; top: 25%; pointer-events: none;" />
                        <span>{{ image.name }}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>

import { ref, computed, inject, watch } from "vue";
import { useRouter } from "vue-router";
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
        const router = useRouter();
        const { getters } = useStore();
        const isBarVisible = ref(false);
        const isCapturing = ref(false);
        const exitModalVisible = ref(false);
        const isBeauty = ref(false);
        const arFrameSettingYn = ref('Y');
        const aspectRatio = ref(0);
        const aspectRatioValue = ref('4 / 6');
        const isPhotoRatioSettingType = ref('BASIC');
        const isSecondFrameBarVisible = ref(false);
        const isSecondEffectBarVisible = ref(false);
        const arStickerSettingYn = ref('N');
        const arFilterSettingYn = ref('N');
        const arCharacterSettingYn = ref('N');
        const arTabSettingYn = ref('N');
        const tabMenuTitle = ref('축제');
        const timerButtonVisible = ref(0);
        const longPressTimer = ref(null);
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
            arFrameSettingYn.value = getters['eventData/arFrameSettingYn'];
            isPhotoRatioSettingType.value = getters['eventData/photoRatioSettingType'];
            arStickerSettingYn.value = getters['eventData/arStickerSettingYn'];
            arFilterSettingYn.value = getters['eventData/arFilterSettingYn'];
            arCharacterSettingYn.value = getters['eventData/arCharacterSettingYn'];
            arTabSettingYn.value = getters['eventData/photoTabMenuAddSettingYn'];
            tabMenuTitle.value = getters['eventData/tabMenuTitle'];

            aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '4 / 6' : '1 / 2';
            isBarVisible.value = !isBarVisible.value;
        }

        const toggleAspectRatio = () => {
            aspectRatio.value = (aspectRatio.value + 1) % 5
            if (aspectRatio.value === 0) {
                aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '4 / 6' : '1 / 2';
            } else if (aspectRatio.value === 1) {
                aspectRatioValue.value = '1 / 1'
            } else if (aspectRatio.value === 2) {
                aspectRatioValue.value = '9 / 16'
            } else if (aspectRatio.value === 3) {
                aspectRatioValue.value = '1 / 2'
            } else if (aspectRatio.value === 4) {
                aspectRatioValue.value = '814 / 1218'
            }
        };

        const frameToggleBar = () => {
            isSecondFrameBarVisible.value = !isSecondFrameBarVisible.value;
            triggerAnimation();
        }
        const effectToggleBar = () => {
            isSecondEffectBarVisible.value = !isSecondEffectBarVisible.value;
            effectTabs.value = getEffectTabs();
            triggerAnimation();
        }

        function triggerAnimation() {
            // 이미지를 선택합니다.
            const images = document.querySelectorAll(".bottom-bar-1 button img");

            // 각 이미지에 대해 .animate-img 클래스를 추가합니다.
            images.forEach((img) => {
                img.classList.add("animate-img");

                // 애니메이션이 끝난 후 .animate-img 클래스를 제거합니다.
                img.addEventListener('animationend', () => {
                    img.classList.remove("animate-img");
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
            if (selectedImage) selectedImage.select = !selectedImage.select;
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
            router.back();
        };

        const startLongPress = () => {
            longPressTimer.value = setTimeout(() => {
                timerButtonVisible.value = 1;
            }, 1000);
        }

        const cancelLongPress = () => {
            clearTimeout(longPressTimer.value);
        }

        const toggleTimer = () => {
            timerButtonVisible.value = (timerButtonVisible.value + 1) % 5;
            if (timerButtonVisible.value === 0) {
                timerButtonVisible.value = 1;
            }
        }

        const capture = () => {
            if (timerButtonVisible.value === 0) {
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
            if (isCapturing.value || timerButtonVisible.value === 0) {
                captureing();
                // aspectRatioValue.value = '1 / 2.2'
            }
        };

        const flipCamera = inject('flipCamera');
        const toggleBeautyFilter = inject('toggleBeautyFilter');
        const selectFrameChange = inject('selectFrameChange');
        const selectCharacterChange = inject('selectCharacterChange');
        const selectTabChange = inject('selectTabChange');
        const selectFilterChange = inject('selectFilterChange');
        const selectStickerChange = inject('selectStickerChange');


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
            let selectedIds = selectedItems.map(item => item.id);
            selectTabChange(selectedIds);
        }, { deep: true });
        watch(() => props.filterList, () => {
            let selectedItems = props.filterList.filter(item => item.select === true);
            let selectedFileNames = selectedItems.map(item => item.name);
            selectFilterChange(selectedFileNames);
        }, { deep: true });

        watch(stickerObjectList, () => {
            selectStickerChange(stickerObjectList.value);
        }, { deep: true });

        EventBus.on('deleteStickerItem', (item) => {
            const index = stickerObjectList.value.findIndex(sticker => sticker.id === item.id);
            stickerObjectList.value.splice(index, 1);
        });


        const frameStyle = computed(() => ({
            aspectRatio: aspectRatioValue.value,
        }));

        const barStyle = computed(() => ({
            backgroundColor: aspectRatio.value === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
        }));

        const frameButtonStyle = computed(() => ({
            color: arFrameSettingYn.value === 'Y' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)',
        }));
        return {
            frameStyle,
            barStyle,
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
            startLongPress,
            cancelLongPress,
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
        }
    }
}
</script>
  
<style scoped>
.NavBar {
    position: absolute;
    width: 100%;
    height: auto;
    background: #f9f9f9;
}

.frame-image {
    width: 100%;
    height: 100%;
    margin-left: 10%;

}

.top-bar {
    position: absolute;
    width: 100%;
    height: 10%;
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
    height: 15%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "frame capture effect";
    color: #fff;
    top: 103%;
}

.bottom-bar-11 {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 7.5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "frame capture effect";
    color: #fff;
    top: 110%;
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
    position: absolute;
    width: 100%;
    display: flex;
    color: #fff;
    justify-content: space-around;
    align-items: center;
    top: 83%;
    padding-top: 1%;
    flex-direction: column;
}

.fade-enter-from,
.fade-leave-to {
    transform: scaleY(0);
    transform-origin: bottom;
}

.fade-enter-active,
.fade-leave-active {
    transition: transform 0.5s ease-in-out;
}

.fade-enter-to,
.fade-leave-from {
    transform: scaleY(1);
    transform-origin: bottom;
}

@keyframes img-scale-down {
    0% {
        transform: scale(2.0);
    }

    100% {
        transform: scale(1.0);
    }
}

@keyframes img-scale-up {
    0% {
        transform: scale(0.5);
    }

    100% {
        transform: scale(1.0);

    }
}

.animate-img {
    animation: img-scale-up 0.5s ease-out;
}


.bottom-bar-11 button img {
    animation: img-scale-down 0.5s ease-out;
}

.tab-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 1%;
}

.image-container {
    display: flex;
    overflow-x: auto;
    width: 100%;
    gap: 1%;
}

.image-container::-webkit-scrollbar {
    height: 1%;
}

.image-view {
    position: relative;
    flex: 0 0 auto;
    width: 24%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
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

.tab.selected {
    background-color: #ccc;
}

.tab {
    margin: 0 6%;
    font-size: 15px;
}

.image-view.selected {
    border: 2px solid blue;
}

.countdown {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3em;
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
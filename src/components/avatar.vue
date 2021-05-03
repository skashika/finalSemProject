<template>
  <div
      id="avatar-wrapper"
      :style="{ height: height + 'px', width : width + 'px'}">
    <div
        id="divVHSS">
    </div>
    <div id="avatar-accessories">
      <div
          v-if="textBubble !== 'none'"
          id="text-bubble"
          :class="textBubbleClass">
        <p>
          {{ userSpeech }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "avatar",
  props: {
    initialWidth: {
      type: Number,
      required: true
    },
    textBubble: {
      //type: String,
      default: "bottom"
    }
  },
  data() {
    return {
      width: this.initialWidth,
      bubbleText: '',
      curLanguage: 'en'
    }
  },
  computed: {
    ...mapState(['userSpeech']),
    height: {
      get: function () {
        return this.width * 1.125;
      },
      set: function (newVal) {
        this.width = newVal * 8 / 9;
      }
    },
    spVoice: function () {
      switch (this.curLanguage) {
        case 'es':
          return 4;
        default: // en
          return 3;
      }
    },
    spLang: function () {
      switch (this.curLanguage) {
        case 'es':
          return 2;
        default: // en
          return 1;
      }
    },
    spEngine: function () {
      switch (this.curLanguage) {
        case 'es':
          return 4;
        default: // en
          return 3;
      }
    },
    textBubbleClass: function () {
      if (this.textBubble === 'bottom') {
        return "bottom-bubble"
      } else if (this.textBubble === 'left') {
        return ["side-bubble", "left-bubble"]
      } else if (this.textBubble === 'right') {
        return ["side-bubble", "right-bubble"]
      }
      return ""
    }
  },
  methods: {
    avatarResize() {
      console.log('New Width is ', this.width)
      console.log('New Height is', this.height)
      window.dynamicResize(this.width * 1.42, this.height)
    },
    speak(speakText) {
      console.log('Speeching Text', speakText)
      window.sayText('<prosody rate="+15%">' + speakText + '</prosody>', 3, 1, 3);

    },

    stopSpeak() {
      window.stopSpeech()
    }
  },
  watch: {
    width: function () {
      window.dynamicResize(this.width * 1.42, this.height);
      console.log('canvas canvas canvas')
    },
  },
  mounted() {
    const that = this
    window.vh_sceneLoaded = function () {
      console.log('It came in here')
      that.avatarResize()
    }
  }
}
</script>

<style scoped>
#divVHSS {
  width: 100%;
}

#avatar-wrapper {
  z-index: 0;
}

#avatar-accessories {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  bottom: 0px;
}

#text-bubble {
  background-color: rgba(30, 101, 39, 0.88);
  border-radius: 35px;
  color: white;
  text-align: center;
  border-style: solid;
  border-color: white;
  border-width: 2px;
  z-index: 999999;
  padding: 0 1em;
}

#text-bubble p {
  font-size: 3em;
  /*padding-top: 1em;*/
}

.bottom-bubble {
  width: 90%;
  max-height: 50%;
  min-height: 15%;
  align-self: center;
  /*bottom: 0;*/
  /*left: 50%!important;*/
  /*transform: translateX(-50%)!important;*/
}

.bottom-bubble p {
  padding-top: 0.5em;
}

.side-bubble {
  display: table;
  width: 100%;
  max-height: 90%;
  min-height: 50%;
  position: absolute;
}

.side-bubble p {
  display: table-cell;
  vertical-align: middle;
}

.left-bubble {
  left: 0;
  top: 50%;
  transform: translate(-98%, -50%);
}

.right-bubble {
  right: -20%;
  top: 50%;
  transform: translate(98%, -50%);
}
</style>

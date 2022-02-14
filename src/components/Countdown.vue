<template>
  <section class="countdown">
    <div class="time-block">
      <div class="time-num">
        <span>{{ days1 }}</span
        ><span>{{ days2 }}</span
        ><span>{{ days3 }}</span>
      </div>
      <div class="time-label">Days</div>
    </div>
    <span class="com">:</span>
    <div class="time-block">
      <div class="time-num">
        <span>{{ hours1 }}</span
        ><span>{{ hours2 }}</span>
      </div>
      <div class="time-label">Hrs</div>
    </div>
    <span class="com">:</span>
    <div class="time-block">
      <div class="time-num">
        <span>{{ minutes1 }}</span
        ><span>{{ minutes2 }}</span>
      </div>
      <div class="time-label">Mins</div>
    </div>
    <span class="com">:</span>
    <div class="time-block">
      <div class="time-num">
        <span>{{ seconds1 }}</span
        ><span>{{ seconds2 }}</span>
      </div>
      <div class="time-label">Secs</div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    startDate: Number,
  },
  data() {
    return {
      seconds2: 0,
      seconds1: 0,
      minutes2: 0,
      minutes1: 0,
      hours2: 0,
      hours1: 0,
      days3: 0,
      days2: 0,
      days1: 0,
      x: null,
    };
  },
  created() {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    var seconds = 0,
      minutes = 0,
      hours = 0,
      days = 0;

    let countDown = this.startDate * 1000;
      //countDown = new Date(birthday).getTime();
    console.log(countDown, new Date().getTime())

    this.x = setInterval(
      function () {
        //console.log('end');
        let now = new Date().getTime();
        let distance;
        if (countDown > now) {
          distance = countDown - now;

          (days = Math.floor(distance / day)),
            (hours = Math.floor((distance % day) / hour)),
            (minutes = Math.floor((distance % hour) / minute)),
            (seconds = Math.floor((distance % minute) / second));

          this.seconds2 = seconds % 10;
          this.seconds1 = Math.floor(seconds / 10);

          this.minutes2 = minutes % 10;
          this.minutes1 = Math.floor(minutes / 10);

          this.hours2 = hours % 10;
          this.hours1 = Math.floor(hours / 10);

          this.days3 = days % 10;
          this.days2 = Math.floor(days / 10) % 10;
          this.days1 = Math.floor(days / 100);
        } else {
          distance = 0;
        }
        //do something later when date is reached
        if (distance <= 0) {
          clearInterval(this.x);
        }
        //seconds
      }.bind(this),
      1000
    );
  },
};
</script>

<style scoped>
.countdown {
  width: 100%;
  font-size:1.7rem;
}
  @media only screen and (min-width: 350px){
      .countdown {
        font-size:1.9rem;
      }
  }
  @media only screen and (min-width: 375px){
      .countdown {
        font-size:2.05rem;
      }
  }
  @media only screen and (min-width: 640px){
      .countdown {
        font-size:3.2rem;
      }
  }
.time-block {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
}
.com {
  display: inline-flex;
  padding: 0 0.1%;
}
.time-label {
  text-align: center;
  text-transform: uppercase;
  font-size: 65%;
  line-height:1.3;
  font-weight:bold;
}
.time-num {
  display: flex;
  flex-direction: row;
}
.time-num span {
  display: block;
  width: 1em;
  background-color: #444;
  text-align: center;
  color: #fff;
  letter-spacing: -1px;
  box-shadow: 1px 1px 1px rgba(4, 4, 4, 0.35);
  border: 1px solid #000;
  background: linear-gradient(to bottom, #222 50%, #333333 50%);
}

</style>

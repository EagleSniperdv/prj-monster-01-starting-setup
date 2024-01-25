function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max-min) + max);
}


const app = Vue.createApp ({

    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            countRound: 0
        };
    },

    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        },

        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        },

        mayUseSpecial() {
            return this.countRound % 3 !== 0
        }
    },

    methods: {

        attackMonster() {
            this.countRound++;
            const attackValue = getRandomNumber(3,7);
            this.monsterHealth=this.monsterHealth - attackValue;
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomNumber(5,8);
            this.playerHealth=this.playerHealth - attackValue;
        },

        specialAttackMonster() {
            this.countRound++;
            const attackValue = getRandomNumber(7,15);
            this.monsterHealth=this.monsterHealth - attackValue;
            this.attackPlayer();
        }
    }

});

app.mount('#game');


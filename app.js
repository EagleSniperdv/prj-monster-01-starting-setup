function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max-min) + max);
}


const app = Vue.createApp ({

    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            countRound: 0,
            winner: null,
            logMessages: [],
        };
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }else if(value<=0) {
                this.winner = 'monster';
            }
        },

        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if(value <= 0) {
                this.winner = 'player';
            }
        }
    },

    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {width: '0'};
            } else {
                return {width: this.monsterHealth + '%'}
            }
        },

        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0'};
            }
            return {width: this.playerHealth + '%'}
        },

        mayUseSpecial() {
            return this.countRound % 3 !== 0
        }
    },

    methods: {

        startGame() {
            this.playerHealth = 100,
            this.monsterHealth= 100,
            this.countRound= 0,
            this.winner= null,
            this.logMessages=[]
        },

        surrenderGame() {
            return this.winner = 'monster', this.playerHealth = 0;
        },

        attackMonster() {
            this.countRound++;
            const attackValue = getRandomNumber(3,7);
            this.monsterHealth=this.monsterHealth - attackValue;
            this.addLogMessage('player','attack',attackValue);
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomNumber(5,8);
            this.playerHealth=this.playerHealth - attackValue;
            this.addLogMessage('monster','attack',attackValue);
        },

        specialAttackMonster() {
            this.countRound++;
            const attackValue = getRandomNumber(7,15);
            this.monsterHealth=this.monsterHealth - attackValue;
            this.addLogMessage('player','attack',attackValue);
            this.attackPlayer();
        },

        healPlayer () {
            this.countRound++;
            const healValue = getRandomNumber(10,15);
            if ( this.playerHealth + healValue > 100 ) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player','heal',healValue);
            this.attackPlayer();
        },

        addLogMessage(who,what,value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }

});

app.mount('#game');


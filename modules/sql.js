import pg from 'pg'
const { Pool, Client } = pg


const pool = new Pool({
    user: 'postgres',
    password: 'PostgresDB!',
    host: '192.168.79.122',
    port: '5432',
    database: 'vandaljs',
})

async function enrollUserData(userid) {
    console.log('new user onboarding with userid ' + userid);
   await queryDB('INSERT INTO users(user_id, admin_level, is_sentinel, msg_sent, hours_in_vc, xp, level) VALUES($1, $2, $3, $4, $5, $6, $7)',[userid, 0, false, 0, 0, 0, 0]);
}
async function queryDB(text,values){
    const query ={  
        text: text,
        values: values
    }
    const res = await pool.query(query)
    return res
}



function levelFromXP(totalXP) {
    let level = 0;
    while (totalXP >= xpRequiredForLevel(level + 1)) {
        level++;
    }
    return level;
}
function xpRequiredForLevel(level) {
    const baseXP = 300;
    const growthFactor = 1.04; // 4% more XP per level
    let xpNeeded = 0;

    for (let i = 1; i <= level; i++) {
        xpNeeded += Math.floor(baseXP * Math.pow(growthFactor, i - 1));
    }

    return xpNeeded;
}
//await client.end()
export class User {
    constructor(userid, data) {
        this.userID = userid;
        this.admin_level = Number(data.admin_level);
        this.is_sentinel = data.is_sentinel;
        this.hours_in_vc = Number(data.hours_in_vc)
        this.msg_sent = Number(data.msg_sent);
        this.level = Number(data.level);
        this.xp = Number(data.xp);
    }

    static async create(userid) {
        let dbResponse = await queryDB(
            'SELECT * FROM users WHERE user_id = $1',
            [userid]
        );
        if (dbResponse.rows[0] == undefined){
            await enrollUserData(userid)
            dbResponse = await queryDB(
            'SELECT * FROM users WHERE user_id = $1',
            [userid]
        );
    }
        return new User(userid, dbResponse.rows[0]);
        
    }



    async save() {
        await queryDB(
            `UPDATE users
             SET admin_level = $1,
                 is_sentinel = $2,
                 msg_sent = $3,
                 hours_in_vc = $4,
                 xp = $5,
                 level = $6
             WHERE user_id = $7`,
            [
                this.admin_level,
                this.is_sentinel,
                this.msg_sent,
                this.hours_in_vc,
                this.xp,
                this.level,
                this.userID
            ]
        );
    }
    

xpAdd(xptoadd) {
    this.xp = this.xp + xptoadd;
    this.level = levelFromXP(this.xp + xptoadd);
    this.checkSentinel()
    this.save()
}
msgAdd(msgToAdd){
    this.msg_sent = this.msg_sent + msgToAdd
    let xptoadd = (Math.ceil(Math.random() * 10))*msgToAdd
    this.xp = xptoadd + this.xp;
    this.level = levelFromXP(this.xp + xptoadd);
    this.checkSentinel()
    this.save()
}
setLevel(levelToSet){
    this.level = levelToSet
    this.xp = xpRequiredForLevel(levelToSet)
    this.checkSentinel()
    this.save()
}
checkSentinel(){
    if (this.level < 10) {
        this.is_sentinel=false
    } else {
        this.is_sentinel=true
    }
}
}


const userObject = await User.create(21);
/*
const userObject = await User.create(22);
userObject.setLevel(22)
console.log(userObject.level);
console.log(userObject.xp);
*/

//await enrollUserData(22)
//enrollUserData(23)
//enrollUserData(24)


//const res = await client.query(query)
//console.log(res.rows[0]);


//await userObject.save();
//console.log(userObject.xp)
//module.exports = User;
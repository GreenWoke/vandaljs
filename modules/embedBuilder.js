import { EmbedBuilder } from 'discord.js';
import { User } from './sql.js'
export class PrEmbed {
    constructor(type, level, xp, msgs, hvc, userpfp, username, userid) {
        this.type = type;
        this.level = level;
        this.xp = xp;
        this.msgs = msgs;
        this.hvc = hvc;
        this.userpfp = userpfp;
        this.username = username;
        this.userid = userid;
    }

    async build() {
        const userObject = await User.create(this.userid);
        const sentinel = userObject.is_sentinel;
        let bannerFile;
        let standingMessage;
        let embedColor;
        if (sentinel) {
            bannerFile = 'https://deepinpowered.xyz/VANDAL/sentbanner.png';
            standingMessage = "**WELCOME SENTINEL\n\nYour standing:**"
            embedColor = '#1D47B7'
        } else if (this.xp < 0) {
            bannerFile = 'https://deepinpowered.xyz/VANDAL/hellbanner' + Math.floor(1+(Math.random()*6)) + '.png'
            console.log(bannerFile);
            standingMessage = "**You are in HELL, not sure how you ended up here honestly...\n\nYour standing:**"
            embedColor = '#FFFFFF'

        } else {
            bannerFile = 'https://deepinpowered.xyz/VANDAL/ccbanner1.png'; console.log(bannerFile);
            standingMessage = "**Your standing:**"
            embedColor = '#057205'
        }

        this.embed = new EmbedBuilder()
            .setAuthor({
                name: "VANDAL",
                iconURL: "https://deepinpowered.xyz/VANDAL/vandal.png",
            })
            .setTitle(String(this.username))
            .setDescription(standingMessage)
            .addFields(
                {
                    name: "Level:",
                    value: String(this.level),
                    inline: false
                },
                {
                    name: "Total XP Earned:",
                    value: String(this.xp),
                    inline: false
                },
                {
                    name: "Messages Sent:",
                    value: String(this.msgs),
                    inline: false
                },
                {//fix me!
                    name: "Time spent in VC:",
                    value: String('Not Implemented'),
                    inline: false
                }
            )
            .setColor(embedColor)
            .setImage(bannerFile)
            .setThumbnail(String(this.userpfp))
            .setFooter({
                text: "Project Radio | Your guide through the noise.",
                iconURL: "https://labs.projectradio.org/VANDAL/prlogowhite80x80.png",
            })
            .setTimestamp();
        return { embeds: [this.embed] };
    }
}

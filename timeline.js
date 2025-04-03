
function calcX(periods, year) {
    // let beginYear = periods[0].start;
    // let endYear = periods[periods.length-1].end;

    let countValues = 0;
    let totalValues = 0;

    for(let i=0; i < periods.length; i++) {
        let y = periods[i];
        if(year>y.end)countValues+=y.scale;
        if(year>y.start && year<=y.end){
            let addVal = (year-y.start)/(y.end-y.start) * y.scale;
            countValues+=addVal;
        }
        totalValues += y.scale;
    }

    return (countValues / totalValues) * 100;
}

const titleDom = document.querySelector("#title");
const subtitleDom = document.querySelector("#subtitle");
const agesDOM = document.querySelector("#ages");
const datesDOM = document.querySelector("#dates");
const timelineInnerDOM = document.querySelector("#timeline-inner")

var currentTimeline = null;
function updateTimeline(timeline) {
    if (typeof timeline === "string") {
        timeline = timelines.find(t => t.id == timeline);
    }
    if (!timeline) {
        if (currentTimeline) timeline = currentTimeline;
        else return;
    }

    title = timeline.title;
    subtitle = timeline.subtitle;
    dates = timeline.dates;
    periods = timeline.periods;
    timelineWidth = timeline.width;

    titleDom.innerHTML = title;
    subtitleDom.innerHTML = subtitle;

    agesDOM.innerHTML = "";
    datesDOM.innerHTML = "";

    dates = dates.sort((a,b) => a.x > b.x);
    if (Math.floor(dates[0].x) < Math.floor(dates[dates.length-1].x)) {
        let firstYear = Math.ceil(dates[0].x);
        let lastYear = Math.floor(dates[dates.length-1].x);
        for (let i = firstYear; i <= lastYear; i++) {
            dates.push({x: i + 1 / 24, y: 4, type:"year", text: i});
        }
    }

    dates = dates.sort((a,b) => a.y < b.y);
    for (let date of dates) {
        let textDOM = document.createElement("div");
        textDOM.classList.add("text");
        if(date.type.length > 0) textDOM.className += " " + date.type;
        let pDivDOM = document.createElement("div");
        textDOM.style.zIndex = 100 - date.y; // iT oNlY lOoKs gOoD oN fIrEfOx
        let pDOM = document.createElement("p");
        pDOM.innerHTML = date.text;
        pDivDOM.appendChild(pDOM);
        textDOM.appendChild(pDivDOM);
        datesDOM.appendChild(textDOM);

        let realX = calcX(periods, date.x)
        textDOM.style.top = date.y + "%";
        textDOM.style.left = realX + "%";
    }

    for (let i = 0; i < periods.length; i++) {
        let period = periods[i];
        let periodDOM = document.createElement("div");
        periodDOM.classList.add("age");
        let pDOM = document.createElement("p");
        pDOM.innerHTML = period.uptext;
        periodDOM.appendChild(pDOM);
        let imgDOM = document.createElement("div");
        imgDOM.classList.add("image");
        imgDOM.innerHTML = period.text;
        periodDOM.appendChild(imgDOM);
        agesDOM.appendChild(periodDOM);

        let realStart = calcX(periods, period.start);
        let realEnd = 100 - calcX(periods, period.end);

        periodDOM.style.left = realStart + "%";
        periodDOM.style.right = realEnd + "%";
        imgDOM.style.backgroundImage = `url(${period.bg})`;
        if (i == periods.length - 1) {
            periodDOM.style.maskImage = "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1) 5em)";
        }
    }
    timelineInnerDOM.style.width = (timelineWidth * 100) + "%";

    currentTimeline = timeline;
}

var timelines = [
    {
        id: 'p2',
        title: 'Portal 2 Speedrunning History Timeline',
        subtitle: 'Created using the collective knowledge of Portal 2 speedrunners.',
        width: 1.5,
        dates: [   
            {x: 2011+4/12, y:30, type:"date2 left", text:'<a href="https://www.youtube.com/watch?v=KSoOjeFBqew" target="_blank">Crouch Flying Glitch<br>(April 2011)</a>'},
            {x: 2011+5/12, y:12, type:"date2 left", text:'<a href="https://www.youtube.com/watch?v=I_7bphdNpIE" target="_blank">McPedro Glitch<br>(Elevator Skip)<br>(May 2011)</a>'},
            {x: 2011+7/12, y:3, type:"date2", text:"Door skip<br>(July 2011)"},
            {x: 2011+10/12, y:19, type:"date2", text:'<a href="https://store.steampowered.com/news/app/620/view/2885074013968467540" target="_blank">Challenge Mode<br>added to the game<br>(October 2011)</a>'},

            {x: 2012+1/12, y:28, type:"date1", text:"Beginnings of<br>ncla.me board<br>(January 2012)"},
            {x: 2012+7/12, y:12, type:"date2", text:"Pocky vs Brex<br>CM competition<br>(July 2012)"},
            {x: 2012+7/12, y:37, type:"date2", text:"Button Stuck Glitch<br>(July 2012)"},
            {x: 2012+12/12, y:22, type:"date2", text:'<a href="https://wiki.portal2.sr/Challenge_Mode" target="_blank">Non-CM levels<br>unlocked in CM<br>(December 2012)</a>'},

            {x: 2013+3/12, y:66, type:"date2", text:"Double Dialogue Skip<br>(March 2013)"},
            {x: 2013+3/12, y:56, type:"date2", text:'<a href="https://www.youtube.com/watch?v=M-bQyzbPV4o" target="_blank">Crouch Toggle Glitch<br>(March 2013)</a>'},
            {x: 2013+3/12, y:46, type:"date2", text:'<a href="https://www.youtube.com/watch?v=yi08QYWrpdE" target="_blank">Super Reportal<br>(March 2013)</a>'},
            {x: 2013+7/12, y:22, type:"date2", text:"phys_timescale<br>controversy<br>(July 2013)"},
            {x: 2013+8/12, y:36, type:"date2", text:'<a href="https://www.youtube.com/watch?v=X1_u3PlM-bg" target="_blank">CM Flag Wrong Warp<br>(August 2013)</a>'},
            {x: 2013+8/12, y:11, type:"date1", text:"ncla.me upgrade<br>(August 2013)"},
            {x: 2013+10/12, y:46, type:"date2", text:"Laser Crusher<br>7 way tie broken<br>(October 2013)"},

            {x: 2014+8.1/12, y:8, type:"date1", text:'<a href="https://youtu.be/U86yDlGEYHk" target="_blank">Segmented<br>Coop 25:48<br>(August 2014)</a>'},
            {x: 2014+9/12, y:22, type:"date1", text:'<a href="https://youtu.be/5x1KXcvHfnQ" target="_blank">Segmented SP 57:15<br>(September 2014)</a>'},
            {x: 2014+9/12, y:47, type:"date2", text:"Three Gels<br>stucklaunch<br>(September 2014)"},
            {x: 2014+9/12, y:32, type:"date2", text:'<a href="https://youtu.be/ngcY-iLbJYc" target="_blank">Kittaye\'s Crazy<br>Box 0 portals<br>(September 2014)</a>'},
            {x: 2014+10/12, y:60, type:"date2", text:'<a href="https://youtu.be/YNOSH0G4Kjw" target="_blank">First Coop sub 30<br>by Klooger and AJ<br>(October 2014)</a>'},
            {x: 2015+1/12, y:72, type:"date2", text:'<a href="https://portalspeedruns.proboards.com/thread/10/tickrate" target="_blank">Tickrate controversy<br>(January 2015)</a>'},
            {x: 2015+2/12, y:43, type:"date2", text:'<a href="https://youtu.be/de8DkNOkNUQ?t=498" target="_blank">Znernicus\'s run<br>at ADGQ 2015<br>(February 2015)</a>'},
            {x: 2015+4/12, y:15, type:"date3", text:'<a href="https://youtu.be/Q7iEeEmr2aY" target="_blank">First Funnel Hop<br>hop by Jetwash<br>(April 2015)</a>'},
            {x: 2015+3/12, y:33, type:"date3", text:"Cube Cheat<br>(March 2015)"},

            {x: 2016+4/12, y:35, type:"date2", text:"Grate shot<br>(Portal CUUT)<br>(April 2016)"},
            {x: 2016+8.5/12, y:15, type:"date1", text:'<a href="https://www.youtube.com/watch?v=KViYt4YUt-E" target="_blank">Beginnings of<br>iVerb board<br>(Aug-Sep 2016)</a>'},
            {x: 2017+1/12, y:36, type:"date2", text:"Znernicus' SS WR run<br>beaten by PerOculos<br>(January 2017)"},
            {x: 2017+5/12, y:22, type:"date2", text:'<a href="https://youtu.be/9vn07psVnFo" target="_blank">100 Portals<br>Segmented<br>(May 2017)</a>'},
            {x: 2017+8/12, y:57, type:"date2", text:"Turret Fly Setup<br>(August 2017)"},
            {x: 2017+8.5/12, y:5, type:"date1", text:"Can't Even vs Msushi<br>SS competition<br>(Aug-Sep 2017)"},
            {x: 2017+9/12, y:33, type:"date2", text:'<a href="https://youtu.be/i75ffJxtW_E" target="_blank">One Hop Run<br>(September 2017)</a>'},
            {x: 2017+10/12, y:44, type:"date3", text:'<a href="https://youtu.be/SKovZSBgtnI" target="_blank">First recorded Test softlock<br>in Can\'t Even\'s WR pace run<br>(October 2017)</a>'},
            {x: 2017+12/12, y:17, type:"date2", text:"'give' nonsense<br>(December 2017)"},
            {x: 2018+3/12, y:25, type:"date2", text:"First OOB SP CM route<br>(Column Blocker)<br>(March 2018)"},
            {x: 2018+3/12, y:38, type:"date3", text:"Birth of PhunaBot<br>(March 2018)"},
            {x: 2018+5/12, y:5, type:"date2", text:'<a href="https://www.youtube.com/watch?v=DM3a55hXiI0" target="_blank">Fizzler Intro PB flood<br>(May 2018)</a>'},
            {x: 2018+8/12, y:15, type:"date2", text:'<a href="https://www.youtube.com/watch?v=Ah7sho7LE_0" target="_blank">Early Moonshot<br>(August 2018)</a>'},
            {x: 2018+8/12, y:25, type:"date3", text:'<a href="https://youtu.be/CnNarcHTJd4" target="_blank">PhunkPai\'s HOPPING<br>(August 2018)</a>'},
            {x: 2018+9/12, y:45, type:"date2", text:'<a href="https://youtu.be/doQQaz42nYg" target="_blank">First NoSla OOB<br>sub 1 by Can\'t Even<br>(September 2018)</a>'},
            {x: 2019+0.5/12, y:15, type:"date2", text:'<a href="https://www.youtube.com/watch?v=gi1aezcKEgk" target="_blank">Jerry Skip/Dane Skip<br>(Dec 2018 - Jan 2019)</a>'},
            {x: 2018+12/12, y:25, type:"date2", text:"Coop Hub 1-2 Skip,<br>category split<br>(December 2018)"},
            {x: 2018+12/12, y:38, type:"date2", text:"Cube Clip<br>(December 2018)"},

            {x: 2019+4/12, y:13, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/146404450859352064/566836338159255558" target="_blank">Spidda<br>got mod<br>(April 2019)</a>'},
            {x: 2019+5/12, y:25, type:"date2", text:'<a href="https://www.youtube.com/watch?v=j9KlUJ5hGi4" target="_blank">Pancake Skip<br>(May 2019)</a>'},
            {x: 2019+5.6/12, y:75, type:"date2", text:'<a href="https://cdn.discordapp.com/attachments/730456562337972248/1357130705414389861/image.png?ex=67ef15f6&is=67edc476&hm=5a14f148878c0660f223880e17be6fcf74bb2f4f4477ffac83702bfa5a3a6e70&" target="_blank">Jerrypedia Created<br>(May 2019)</a>'}, 
            //^^ fix spacing
            {x: 2019+6/12, y:4, type:"date2", text:'<a href="https://youtu.be/YfxYJcj0yeM" target="_blank">First NoSLA Inbounds<br>sub 1h by Can\'t Even<br>(June 19th 2019)</a>'},
            {x: 2019+6/12, y:35, type:"date1", text:'<a href="https://youtu.be/Q2y0j3Ex6lA" target="_blank">Can\'t Even\'s run<br>at SGDQ 2019<br>(June 2019)</a>'},
            {x: 2019+7/12, y:50, type:"date2", text:'<a href="https://www.youtube.com/watch?v=_be42ksKKbo" target="_blank">BTG in 0 portals<br>by PerOculos<br>(July 2019)</a>'},
            {x: 2019+8.4/12, y:20, type:"date1", text:'<a href="https://www.youtube.com/watch?v=FpO3N8jgezc" target="_blank">Zypeh dominating<br>SP CM (60/60)<br>(August 2019)</a>'},
            {x: 2019+7/12, y:64, type:"date2", text:"Moving portals banned<br>(July 2019)"},
            {x: 2019+9.3/12, y:11, type:"date2", text:'<a href="https://youtu.be/tbKhToSKM64" target="_blank">Coop TAS<br>(September 2019)</a>'}, // Video is from nov?
            {x: 2019+11/12, y:33, type:"date2", text:'<a href="https://www.youtube.com/watch?v=4ZCBQ7ZSac0" target="_blank">Ceiling Skip<br>(November 2019)</a>'},

            {x: 2020+1/12, y:23, type:"date1", text:'<a href="https://sm.portal2.sr" target="_blank">Speedrun Mod<br>(January 2020)</a>'},

            {x: 2020+3/12, y:5, type:"date2", text:"Lemon Skip<br>(March 2020)"},
            {x: 2020+4/12, y:45, type:"date3", text:"Creation of<br>this timeline<br>(April 2020)"},
            {x: 2020+4/12, y:15, type:"date2", text:"Explosion of NoSLA<br>Super Reportal routes<br>(end of April 2020)"},

            {x: 2020+6/12, y:30, type:"date2", text:"First NoSLA Inbounds<br>sub 59 by Can't Even<br>(June 18th 2020)"},
            {x: 2020+7/12, y:5, type:"date2", text:"Lemonade Skip<br>(July 2020)"},

            {x: 2020+10/12, y:5, type:"date2", text:"Implosion Skip<br>(October 2020)"},
            // {x: 2020+10/12, y:10, type:"date2", text:'<a href="https://www.youtube.com/watch?v=_be42ksKKbo" target="_blank">Finale 2 Jump of Death<br>(October 2020)</a>'},
            {x: 2020+11/12, y:28, type:"date2", text:'<a href="https://wiki.portal2.sr" target="_blank">P2SR Wiki<br>(November 11th 2020)</a>'}, //https://wiki.portal2.sr/index.php?title=Main_Page&oldid=1 ??? August?
            {x: 2020+11/12, y:15, type:"date2", text:'<a href="https://www.youtube.com/watch?v=ACZUxJXIgG4" target="_blank">P1 corner seamshots<br>found doable in P2<br>(November 8th 2020)</a>'},
            {x: 2020+12/12, y:38, type:"date1", text:'<a href="https://youtu.be/6zeK_7ELuVo" target="_blank">First NoSLA Inbounds<br>sub 58 by Can\'t Even<br>(December 27th 2020)</a>'},

            {x: 2021+1/12, y:53, type:"date1", text:'<a href="https://store.steampowered.com/news/app/620/view/3030330956958940087" target="_blank">Memory leak fix hack<br>for faster loadings<br>made by Krzyhau<br>(January 4th 2021)</a>'},
            {x: 2021+2.5/12, y:10, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/146404450859352064/811295869382426674" target="_blank">Mtriggers added<br>to SAR<br>(Feb 2022)</a>'},
            {x: 2021+2.8/12, y:27, type:"date3", text:'<a href="https://www.youtube.com/watch?v=nn1xO659jOM" target="_blank">Finale 1 Funnelless<br>discovered<br>(Feb 2022)</a>'},
            {x: 2021+5.2/12, y:15, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/309475209839247370/840782130534809640" target="_blank">Finale 3<br>Pommiton Route<br>discovered (May 2021)</a>'},
            {x: 2021+6.2/12, y:5, type:"date3", text:'<a href="https://www.youtube.com/watch?v=QjtNLBqkJUM&t=1631s" target="_blank">69 Portals<br>Segmented<br>(June 2021)</a>'},
            {x: 2021+6.6/12, y:33, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/636786123091345438/855584137934536724" target="_blank">NoSLA Funneling Ban<br>(June 2021)</a>'},
            {x: 2021+7.7/12, y:43, type:"date3", text:'<a href="https://www.youtube.com/watch?v=YaM1Q6YhWYA" target="_blank">Test Launch<br>discovered<br>(July 2021) </a>'},
            {x: 2021+11.7/12, y:12, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/438528310394486787/912471742117711942" target="_blank">Toast Skip<br>discovered<br>(Nov 2021)</a>'},
            //{x: 2024+11.9/12, y:5, type:"date2", text:'<a href="https://discord.com/channels/146404426746167296/586983011740942337/913438994019278928" target="_blank">Unity Rank 1<br>in 6 months<br>(Nov 2021)</a>'},

            {x: 2022+1.4/12, y:60, type:"date3", text:'<a href="https://www.youtube.com/watch?v=gf3_glznM6g" target="_blank">Laser Relays<br>Food Route<br>discovered<br>(Jan 2022)</a>'},
            {x: 2022+5.7/12, y:5, type:"date3", text:'<a href="https://www.youtube.com/watch?v=hp_u81TZhsM" target="_blank">Chorus Skip<br>discovered<br>(May 2022)</a>'},
            {x: 2022+6.1/12, y:15, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/636786123091345438/982757464690798593" target="_blank">Vault Save<br>allowed in NoSLA<br>(June 2022)</a>'},
            {x: 2022+6.4/12, y:33, type:"date3", text:'<a href="https://www.youtube.com/watch?v=Dfpp1gjAPS4" target="_blank">57:15 Segmented<br>beaten by<br>AngerySnek (June 2022)</a>'},
            {x: 2022+6.5/12, y:43, type:"date1", text:'<a href="https://www.youtube.com/watch?v=om0VhrtQshs" target="_blank">First Sub 57<br> NoSLA by<br>AngerySnek (June 2022)</a>'},
            {x: 2022+6.8/12, y:60, type:"date1", text:'<a href="https://discord.com/channels/146404426746167296/730456562337972248/1357138603020521593" target="_blank">Finale 4 Skip<br>discovered<br>(June 2022)</a>'},
            {x: 2022+7/12, y:75, type:"date2", text:'<a href="https://www.youtube.com/watch?v=MZi1dXwCqG8" target="_blank">Fullgame TAS<br>(July 2022)</a>'},
            {x: 2022+7.5/12, y:25, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/811780246608281650/997856959036391474" target="_blank">EHM understood<br>(July 2022)</a>'},
            {x: 2022+8.1/12, y:85, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/607824741847269408/1005195813170974824" target="_blank">Autorender created<br>(Aug 2022)</a>'},
            {x: 2022+11.4/12, y:15, type:"date3", text:'<a href="https://discord.com/channels/146404426746167296/636786123091345438/1040900066526896218" target="_blank">Cutscene skip<br>allowed in<br>NoSLA (Nov 2022)</a>'},
            {x: 2022+11.4/12, y:25, type:"date3", text:'<a href="https://cdn.discordapp.com/attachments/963829425433096252/1058856068345765928/funnel_catch_cm_oob.dem.mp4?ex=67eefa8f&is=67eda90f&hm=46459d3a51cdfc1055eb9b5a04d78aa5634f4cca226a273db919b40e2c58ef90&" target="_blank">Funnel Catch<br>OOB Route<br>(Dec 2022)</a>'},
            // very crammed 






            {x: 2025+4/12, y:45, type:"date1", text:"Update of<br>this timeline<br>(April 2025)"},
            // {x: 2022+/12, y:5, type:"date3", text:'<a href="" target="_blank"></a>'},
            // spidda lost mod 2023-12-06 https://discord.com/channels/146404426746167296/146404450859352064/1182049030407213167
            // wiki
            // lag fix
        ],
        periods: [
            {start: 2011+4/12, end:2012+2/12, scale:1, bg:"img/start.jpg", text:"Establishment Period", uptext:"Portal 2 released<br>(April 2011)"},
            {start: 2012+2/12, end:2015+2/12, scale:2.5, bg:"img/oldbois.jpg", text:"Age of Old Runners", uptext:"Bananasaurus Rex dominating SP CM (48/51)<br>(February 2012)"},
            {start: 2015+2/12, end:2016+2/12, scale:0.5, bg:"img/deadyear.jpg", text:"Dead Year", uptext:"Znernicus's run<br>at AGDQ 2015<br>(February 2015)"},
            {start: 2016+2/12, end:2017+8/12, scale:1, bg:"img/interlude.jpg", text:"Interlude", uptext:"Creation of Discord server<br>(February 2016)"},
            {start: 2017+8/12, end:2019+1/12, scale:2, bg:"img/newbois.jpg", text:"Age of New Runners", uptext:"SS WR overtaken<br>by new runners<br>(August 2017)"},
            {start: 2019+1/12, end:2021+4/12, scale:3.2, bg:"img/renaissance.jpg", text:"Renaissance", uptext:"SS changed to NoSLA<br>(January 2019)"},
            // renaissance isn't centered....
            {start: 2021+1/12, end:2025+11/12, scale:5, bg:"img/technologicalrevolution.jpg", text:"Technological Revolution", uptext:""}
        ]
    },
    {
        id: 'lemon',
        title: 'Lemon Skip History Timeline',
        subtitle: 'Yep a whole timeline for one route.',
        width: 0.5,

        dates: [
            {x: 2013+3.5/12, y:15, type:"date1 left", text:"Conversion Intro SLA<br>Super Reportal route<br>by iVerb (March 2013)"},
            {x: 2014+9.5/12, y:30, type:"date1", text:'<a href="https://youtu.be/Hzx8o-KWrJE" target="_blank">NoSLA short SR discovery<br>and first clip stuck SR<br>(accidental) by NeKz <br>(September 2014)</a>'},
            {x: 2019+11/12, y:20, type:"date1", text:'Rediscovery and research<br>of clip stuck by<br>Krzyhau and bill_play<br>(November 2019)'},
            {x: 2020+3/12, y:45, type:"date1", text:'Discovery of catapult<br>trigger deactivation<br>by Krzyhau<br>(March 2020)'},
        ],

        periods: [
            {start: 2013+3/12, end:2020+2/12, scale:2, bg:"img/start.jpg", text:"Beginnings", uptext:"Super Reportal discovered by Jesustf2<br>(March 2013)"},
            {start: 2020+3/12, end:2020+8/12, scale:1, bg:"img/deadyear.jpg", text:"Lemon Time", uptext:"First CM WR run utilizing<br>Super Reportal by Krzyhau<br>(March 2020)"},
        ]
    }
];

updateTimeline('p2');

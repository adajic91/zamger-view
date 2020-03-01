// ==UserScript==
// @name            Zamger view
// @author          Anonymous
// @description     Dodaje link do izvjestaja o ocjenama, dodaje imena i prezimena uz indekse
// @version         0.4
// @include         https://zamger.etf.unsa.ba*
// @encoding        UTF-8
// ==/UserScript==

var indeksi= [
    '15874','Ademović Adnan',
    '15756','Aliman Lejla',
    '14985','Begić Amra',
    '15504','Begović Amila',
    '15799','Čolo Nermin',
    '15293','Čustović Nedim',
    '15738','Dajić Armin',
    '15878','Delija Ariana',
    '15742','Dević Sanela',
    '15694','Ekmeščić Elma',
    '15237','Gotovac Dejan',
    '15774','Gurbeta Lejla',
    '15706','Hadžiselimović Maja',
    '15432','Hadžović Kenan',
    '15693','Hajrulahović Mersad',
    '15112','Jusić Emir',
    '15566','Halilović Ahmet',
    '15744','Hatibović Indira',
    '15788','Huseinović Amel',
    '15766','Kajević Dalila',
    '15809','Karahodža Haris',
    '15877','Karaman Ilma',
    '15897','Kobilica Mirzet',
    '15701','Krneta Nikola',
    '15715','Mašić Armin',
    '15864','Muhedinović Haris',
    '15808','Mulaosmanović Ajdin',
    '15699','Peco Bećir',
    '15722','Ramusović Elma',
    '15564','Šabanović Azra',
    '15892','Trogrlić Darko',
    '15764','Vardo Almir',
    '15880','Omerdić Nisveta',
    '15698','Neimarlija Ilma',
    '15460','Egrlić Emina',
    '15442','Kajmaković Amer',
    '15279','Hajdarević Fuad',
    '15846','Ahmetović Emir',
    '15816','Ahmić Dino',
    '15322','Baručija Nermin',
    '15544','Džino Elma',
    '15772','Đilović Amel',
    '15651','Elezović Almin',
    '15929','Hadžić Alen',
    '15871','Hadžić Kenan',
    '15579','Hajdarević Adnan',
    '15600','Hajro Lana',
    '15762','Haseljić Hana',
    '15775','Hidić Adnan',
    '15652','Durmo Naida',
    '15533','Husić Dženisa',
    '15885','Jašarević Amar',
    '15735','Kadić Amra',
    '15484','Karalić Nedžla',
    '15453','Klisura Kenan',
    '15390','Kotolenko Denis',
    '15763','Krdžić Almira',
    '15586','Ligata Edin',
    '15695','Maksumić Amna',
    '15814','Merdan Edin',
    '15887','Miličević Marina',
    '15720','Prazina Irfan',
    '15572','Selmanović Amel',
    '15725','Sinanović Nusreta',
    '15793','Vištica Martina',
    '15759','Zubanović Damir',
    '15949','Semić Hamza'
];

function getVar(cilj,poruka) {
    pronadeno="";
    poz = poruka.indexOf(cilj);
    if (poz!=-1) {
        poz+=cilj.length;
        while ((poruka.charAt(poz) >= 'A' && poruka.charAt(poz) <= 'Z') ||
            (poruka.charAt(poz) >= 'a' && poruka.charAt(poz) <= 'z') ||
            (poruka.charAt(poz) >= '0' && poruka.charAt(poz) <= '9')) {
            pronadeno = pronadeno + poruka.charAt(poz);
            poz = poz+1;
        }
    }
    return pronadeno;
}

var strLink = document.URL;
var sta = getVar('sta=', strLink);
var predmet = getVar('predmet=', strLink);
var ag = getVar('ag=', strLink);
var arhiva = getVar('arhiva=', strLink);

var dugme_part1 = '<a href="https://zamger.etf.unsa.ba/?sta=izvjestaj/predmet&';
var dugme_part2 = '"><input type="button" style="cursor:pointer;" value="Izvještaj o ocjenama tvoje generacije"></a>';
var dugme_part3 = '"><input type="button" style="cursor:pointer;" value="Izvještaj o ocjenama prethodne generacije"></a>';
if (sta == 'student' && predmet.length != 0 && ag.length != 0 && arhiva.length != 0) {
    ag_pret=(parseInt(ag)-1).toString();
    document.body.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" style="position:absolute;left:224px;top:55px;"><tr><td style="padding:0px;">' + dugme_part1 + 'predmet=' + predmet + '&ag=' + ag + '&sm_arhiva=' + arhiva + dugme_part2 + '</td><td style="padding:0px; padding-left: 10px;">' + 
                              dugme_part1 + 'predmet=' + predmet + '&ag=' + ag_pret + '&sm_arhiva=' + arhiva + dugme_part3 + '</td></tr></table>' + document.body.innerHTML;
    
} else if (sta == 'izvjestaj' && predmet.length != 0 && ag.length != 0 && arhiva.length != 0) {
    html_code = document.body.innerHTML;
    for (var k = 0; k < indeksi.length; k = k+2) {
        poz = html_code.indexOf(indeksi[k]);
        if (poz >= 0) {
            poz = poz + indeksi[k].length;
            html_part1 = html_code.substr(0, poz);
            html_part2 = html_code.substr(poz);
            html_code = html_part1 + ' <font color="blue">' + indeksi[k+1] + '</font>' + html_part2;
        }
    }
    document.body.innerHTML=html_code;
}

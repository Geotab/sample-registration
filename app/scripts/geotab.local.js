(function () {
  'use strict';

  /**
   * Continent
   * @type {{Unknown: string, Asia: string, Africa: string, NorthAmerica: string, SouthAmerica: string, Antarctica: string, Europe: string, Australia: string}}
   */
  var continent = {
    Unknown: "Unknown",
    Asia: "Asia",
    Africa: "Africa",
    NorthAmerica: "NorthAmerica",
    SouthAmerica: "SouthAmerica",
    Antarctica: "Antarctica",
    Europe: "Europe",
    Australia: "Australia"
  };

  /**
   * Fuel economy units
   * @type {{LitersPer100Km: string, KmPerLiter: string, MPGUS: string, MPGImperial: string}}
   */
  var fuelEconomyUnit = {
    LitersPer100Km: "LitersPer100Km",
    KmPerLiter: "KmPerLiter",
    MPGUS: "MPGUS",
    MPGImperial: "MPGImperial"
  };

  /**
   * Is the time zone id in US
   * @param id {string} - the IANA time zone id
   * @returns {boolean} - true if the time zone is in the US
   */
  var isUS = function (id) {
    switch (id) {
      case "America/Phoenix":
      case "America/Los_Angeles":
      case "America/Indiana/Knox":
      case "America/Indianapolis":
      case "America/Menominee":
      case "America/New_York":
      case "America/Boise":
      case "America/Sitka":
      case "America/Indiana/Marengo":
      case "America/North_Dakota/New_Salem":
      case "America/St_Vincent":
      case "America/Chicago":
      case "America/Indiana/Winamac":
      case "America/North_Dakota/Beulah":
      case "America/North_Dakota/Center":
      case "America/Detroit":
      case "America/Anchorage":
      case "America/Indiana/Tell_City":
      case "America/Louisville":
      case "America/Indiana/Vevay":
      case "America/Indiana/Vincennes":
      case "America/Shiprock":
      case "America/Kentucky/Monticello":
      case "America/Denver":
      case "America/Indiana/Petersburg":
      case "America/Yakutat":
      case "America/Juneau":
      case "Pacific/Honolulu":
      case "America/Nome":
        return true;
      default :
        return false;
    }
  };

  /**
   * Get continent by time zone id
   * @param id {string} - the IANA time zone id
   * @returns {string} - the continent
   */
  var getContinentByTimeZone = function (id) {
    switch (id) {
      case "Africa/Casablanca":
      case "Africa/Ouagadougou":
      case "Africa/Abidjan":
      case "Africa/El_Aaiun":
      case "Africa/Accra":
      case "Africa/Banjul":
      case "Africa/Conakry":
      case "Africa/Bissau":
      case "Africa/Monrovia":
      case "Africa/Bamako":
      case "Africa/Nouakchott":
      case "Africa/Freetown":
      case "Africa/Dakar":
      case "Africa/Sao_Tome":
      case "Africa/Lome":
      case "Africa/Cairo":
      case "Africa/Tripoli":
      case "Africa/Ceuta":
      case "Africa/Lagos":
      case "Africa/Luanda":
      case "Africa/Porto-Novo":
      case "Africa/Kinshasa":
      case "Africa/Bangui":
      case "Africa/Brazzaville":
      case "Africa/Douala":
      case "Africa/Algiers":
      case "Africa/Libreville":
      case "Africa/Malabo":
      case "Africa/Niamey":
      case "Africa/Ndjamena":
      case "Africa/Tunis":
      case "Africa/Windhoek":
      case "Africa/Johannesburg":
      case "Africa/Bujumbura":
      case "Africa/Gaborone":
      case "Africa/Lubumbashi":
      case "Africa/Maseru":
      case "Africa/Blantyre":
      case "Africa/Maputo":
      case "Africa/Kigali":
      case "Africa/Mbabane":
      case "Africa/Lusaka":
      case "Africa/Harare":
      case "Africa/Nairobi":
      case "Africa/Djibouti":
      case "Africa/Asmera":
      case "Africa/Addis_Ababa":
      case "Africa/Khartoum":
      case "Africa/Mogadishu":
      case "Africa/Juba":
      case "Africa/Dar_es_Salaam":
      case "Africa/Kampala":
      case "Indian/Comoro":
      case "Indian/Antananarivo":
      case "Indian/Mauritius":
      case "Indian/Mahe":
      case "Atlantic/Cape_Verde":
      case "Indian/Mayotte":
      case "Indian/Reunion":
        return continent.Africa;
      case "Asia/Calcutta":
      case "Asia/Colombo":
      case "Asia/Katmandu":
      case "Asia/Almaty":
      case "Asia/Bishkek":
      case "Asia/Qyzylorda":
      case "Asia/Dhaka":
      case "Asia/Thimphu":
      case "Asia/Yekaterinburg":
      case "Asia/Rangoon":
      case "Asia/Bangkok":
      case "Asia/Jakarta":
      case "Asia/Pontianak":
      case "Asia/Phnom_Penh":
      case "Asia/Vientiane":
      case "Asia/Hovd":
      case "Asia/Saigon":
      case "Asia/Novosibirsk":
      case "Asia/Novokuznetsk":
      case "Asia/Omsk":
      case "Asia/Shanghai":
      case "Asia/Chongqing":
      case "Asia/Harbin":
      case "Asia/Kashgar":
      case "Asia/Urumqi":
      case "Asia/Hong_Kong":
      case "Asia/Macau":
      case "Asia/Krasnoyarsk":
      case "Asia/Singapore":
      case "Asia/Brunei":
      case "Asia/Makassar":
      case "Asia/Kuala_Lumpur":
      case "Asia/Kuching":
      case "Asia/Manila":
      case "Asia/Taipei":
      case "Asia/Ulaanbaatar":
      case "Asia/Choibalsan":
      case "Asia/Irkutsk":
      case "Asia/Tokyo":
      case "Asia/Jayapura":
      case "Asia/Dili":
      case "Asia/Seoul":
      case "Asia/Pyongyang":
      case "Asia/Yakutsk":
      case "Asia/Khandyga":
      case "Asia/Vladivostok":
      case "Asia/Sakhalin":
      case "Asia/Ust-Nera":
      case "Asia/Magadan":
      case "Asia/Anadyr":
      case "Asia/Kamchatka":
      case "Asia/Beirut":
      case "Asia/Gaza":
      case "Asia/Hebron":
      case "Asia/Damascus":
      case "Asia/Nicosia":
      case "Asia/Jerusalem":
      case "Asia/Amman":
      case "Asia/Baghdad":
      case "Asia/Riyadh":
      case "Asia/Bahrain":
      case "Asia/Kuwait":
      case "Asia/Qatar":
      case "Asia/Aden":
      case "Asia/Tehran":
      case "Asia/Dubai":
      case "Asia/Muscat":
      case "Asia/Baku":
      case "Asia/Tbilisi":
      case "Asia/Yerevan":
      case "Asia/Kabul":
      case "Asia/Karachi":
      case "Asia/Tashkent":
      case "Asia/Oral":
      case "Asia/Aqtau":
      case "Asia/Aqtobe":
      case "Asia/Dushanbe":
      case "Asia/Ashgabat":
      case "Asia/Samarkand":
      case "Indian/Maldives":
      case "Indian/Cocos":
        return continent.Asia;
      case "Australia/Perth":
      case "Australia/Adelaide":
      case "Australia/Broken_Hill":
      case "Australia/Darwin":
      case "Australia/Brisbane":
      case "Australia/Lindeman":
      case "Australia/Sydney":
      case "Australia/Melbourne":
      case "Australia/Hobart":
      case "Australia/Currie":
        return continent.Australia;
      case "Europe/London":
      case "Europe/Guernsey":
      case "Europe/Dublin":
      case "Europe/Isle_of_Man":
      case "Europe/Jersey":
      case "Europe/Lisbon":
      case "Europe/Berlin":
      case "Europe/Andorra":
      case "Europe/Vienna":
      case "Europe/Zurich":
      case "Europe/Busingen":
      case "Europe/Gibraltar":
      case "Europe/Rome":
      case "Europe/Vaduz":
      case "Europe/Luxembourg":
      case "Europe/Monaco":
      case "Europe/Malta":
      case "Europe/Amsterdam":
      case "Europe/Oslo":
      case "Europe/Stockholm":
      case "Europe/San_Marino":
      case "Europe/Vatican":
      case "Europe/Budapest":
      case "Europe/Tirane":
      case "Europe/Prague":
      case "Europe/Podgorica":
      case "Europe/Belgrade":
      case "Europe/Ljubljana":
      case "Europe/Bratislava":
      case "Europe/Paris":
      case "Europe/Brussels":
      case "Europe/Copenhagen":
      case "Europe/Madrid":
      case "Europe/Warsaw":
      case "Europe/Sarajevo":
      case "Europe/Zagreb":
      case "Europe/Skopje":
      case "Europe/Bucharest":
      case "Europe/Athens":
      case "Europe/Chisinau":
      case "Europe/Kiev":
      case "Europe/Mariehamn":
      case "Europe/Sofia":
      case "Europe/Tallinn":
      case "Europe/Helsinki":
      case "Europe/Vilnius":
      case "Europe/Riga":
      case "Europe/Simferopol":
      case "Europe/Uzhgorod":
      case "Europe/Zaporozhye":
      case "Europe/Istanbul":
      case "Europe/Kaliningrad":
      case "Europe/Minsk":
      case "Europe/Moscow":
      case "Europe/Samara":
      case "Europe/Volgograd":
      case "Atlantic/Azores":
      case "Atlantic/Canary":
      case "Atlantic/Madeira":
      case "Atlantic/Reykjavik":
        return continent.Europe;
      case "America/Anchorage":
      case "America/Juneau":
      case "America/Nome":
      case "America/Sitka":
      case "America/Yakutat":
      case "America/Los_Angeles":
      case "America/Vancouver":
      case "America/Dawson":
      case "America/Whitehorse":
      case "America/Tijuana":
      case "America/Phoenix":
      case "America/Dawson_Creek":
      case "America/Creston":
      case "America/Hermosillo":
      case "America/Chihuahua":
      case "America/Mazatlan":
      case "America/Denver":
      case "America/Edmonton":
      case "America/Cambridge_Bay":
      case "America/Inuvik":
      case "America/Yellowknife":
      case "America/Ojinaga":
      case "America/Boise":
      case "America/Shiprock":
      case "America/Guatemala":
      case "America/Belize":
      case "America/Costa_Rica":
      case "America/Tegucigalpa":
      case "America/Managua":
      case "America/El_Salvador":
      case "America/Chicago":
      case "America/Winnipeg":
      case "America/Rainy_River":
      case "America/Rankin_Inlet":
      case "America/Menominee":
      case "America/North_Dakota/Beulah":
      case "America/North_Dakota/Center":
      case "America/North_Dakota/New_Salem":
      case "America/Mexico_City":
      case "America/Cancun":
      case "America/Merida":
      case "America/Monterrey":
      case "America/Regina":
      case "America/Swift_Current":
      case "America/Port-au-Prince":
      case "America/Jamaica":
      case "America/Panama":
      case "America/New_York":
      case "America/Nassau":
      case "America/Toronto":
      case "America/Iqaluit":
      case "America/Montreal":
      case "America/Nipigon":
      case "America/Pangnirtung":
      case "America/Thunder_Bay":
      case "America/Detroit":
      case "America/Indiana/Petersburg":
      case "America/Indiana/Vincennes":
      case "America/Indiana/Winamac":
      case "America/Kentucky/Monticello":
      case "America/Louisville":
      case "America/Indianapolis":
      case "America/Indiana/Marengo":
      case "America/Indiana/Vevay":
      case "America/Halifax":
      case "America/Glace_Bay":
      case "America/Goose_Bay":
      case "America/Moncton":
      case "America/Antigua":
      case "America/Barbados":
      case "America/Blanc-Sablon":
      case "America/Dominica":
      case "America/Santo_Domingo":
      case "America/Grenada":
      case "America/St_Kitts":
      case "America/St_Lucia":
      case "America/Port_of_Spain":
      case "America/St_Vincent":
      case "America/St_Johns":
      case "America/Resolute":
      case "America/Matamoros":
      case "America/Indiana/Knox":
      case "America/Coral_Harbour":
      case "America/Cayman":
      case "Atlantic/Bermuda":
      case "America/Thule":
      case "America/Godthab":
      case "America/Danmarkshavn":
      case "America/Indiana/Tell_City":
      case "Pacific/Honolulu":
      case "America/St_Barthelemy":
      case "America/Puerto_Rico":
      case "America/Tortola":
        return continent.NorthAmerica;
      case "Pacific/Galapagos":
      case "America/Bogota":
      case "America/Guayaquil":
      case "America/Lima":
      case "America/Caracas":
      case "America/Asuncion":
      case "America/Cuiaba":
      case "America/Campo_Grande":
      case "America/La_Paz":
      case "America/Manaus":
      case "America/Boa_Vista":
      case "America/Eirunepe":
      case "America/Porto_Velho":
      case "America/Rio_Branco":
      case "America/Guyana":
      case "America/Santiago":
      case "America/Sao_Paulo":
      case "America/Araguaina":
      case "America/Buenos_Aires":
      case "America/Argentina/La_Rioja":
      case "America/Argentina/Rio_Gallegos":
      case "America/Argentina/Salta":
      case "America/Argentina/San_Juan":
      case "America/Argentina/San_Luis":
      case "America/Argentina/Tucuman":
      case "America/Argentina/Ushuaia":
      case "America/Catamarca":
      case "America/Cordoba":
      case "America/Jujuy":
      case "America/Mendoza":
      case "America/Fortaleza":
      case "America/Belem":
      case "America/Maceio":
      case "America/Recife":
      case "America/Paramaribo":
      case "America/Montevideo":
      case "America/Bahia":
      case "America/Noronha":
      case "America/Anguilla":
      case "America/Aruba":
      case "America/Kralendijk":
      case "America/Curacao":
      case "America/Guadeloupe":
      case "America/Marigot":
      case "America/Martinique":
      case "America/Montserrat":
      case "America/Cayenne":
      case "America/Santarem":
      case "Atlantic/Stanley":
        return continent.SouthAmerica;
      default:
        return continent.Unknown;
    }
  };

  /**
   * Get the date time format from time zone
   * @param id {string} - the IANA time zone id
   * @returns {string} - the date time format
   */
  var getDateTimeFormatByTimeZone = function (id) {
    var myContinent = getContinentByTimeZone(id);

    switch (myContinent) {
      case continent.Europe:
        return "dd/MM/yy HH:mm:ss";
      case continent.Asia:
        return "dd/MM/yy hh:mm:ss tt";
      case continent.NorthAmerica:
      case continent.SouthAmerica:
        return "MM/dd/yy hh:mm:ss tt";
      case continent.Australia:
      case continent.Africa:
        return "dd/MM/yy hh:mm:ss tt";
      default:
        return "MM/dd/yy HH:mm:ss";
    }
  };

  /**
   * Get the fuel economy unit of measure by time zone
   * @param id {string} - the IANA time zone id
   * @returns {string} - the fuel economy units
   */
  var getFuelEconomyUnitByTimeZone = function (id) {
    if (isUS(id)) {
      return fuelEconomyUnit.MPGUS;
    }
    switch (id) {
      case "Europe/London":
      case "Europe/Guernsey":
      case "Europe/Isle_of_Man":
      case "Europe/Jersey":
        return fuelEconomyUnit.MPGImperial;
      case "Europe/Amsterdam":
      case "Europe/Copenhagen":
      case "Asia/Calcutta":
      case "Asia/Tokyo":
      case "Asia/Seoul":
      case "America/Buenos_Aires":
      case "America/Argentina/La_Rioja":
      case "America/Argentina/Rio_Gallegos":
      case "America/Argentina/Salta":
      case "America/Argentina/San_Juan":
      case "America/Argentina/San_Luis":
      case "America/Argentina/Tucuman":
      case "America/Argentina/Ushuaia":
      case "America/Catamarca":
      case "America/Cordoba":
      case "America/Jujuy":
      case "America/Mendoza":
      case "America/La_Paz":
      case "America/Cuiaba":
      case "America/Campo_Grande":
      case "America/Manaus":
      case "America/Boa_Vista":
      case "America/Eirunepe":
      case "America/Porto_Velho":
      case "America/Rio_Branco":
      case "America/Sao_Paulo":
      case "America/Araguaina":
      case "America/Fortaleza":
      case "America/Belem":
      case "America/Maceio":
      case "America/Recife":
      case "America/Bahia":
      case "America/Noronha":
      case "America/Santarem":
      case "America/Santiago":
      case "America/Bogota":
      case "America/Costa_Rica":
      case "America/Santo_Domingo":
      case "America/Guayaquil":
      case "America/El_Salvador":
      case "America/Cayenne":
      case "America/Guadeloupe":
      case "America/Guatemala":
      case "America/Port-au-Prince":
      case "America/Tegucigalpa":
      case "America/Martinique":
      case "America/Tijuana":
      case "America/Hermosillo":
      case "America/Chihuahua":
      case "America/Mazatlan":
      case "America/Ojinaga":
      case "America/Mexico_City":
      case "America/Cancun":
      case "America/Merida":
      case "America/Monterrey":
      case "America/Matamoros":
      case "America/Managua":
      case "America/Panama":
      case "America/Asuncion":
      case "America/Lima":
      case "America/Puerto_Rico":
      case "America/St_Barthelemy":
      case "America/Montevideo":
      case "America/Caracas":
        return fuelEconomyUnit.KmPerLiter;
      default :
        return fuelEconomyUnit.LitersPer100Km;
    }
  };

  /**
   * Get if metric is supported in this time zone
   * @param id {string} - the IANA time zone id
   * @returns {boolean} - true if the time zone supports metric units
   */
  var getIsMetricByTimeZone = function (id) {
    if (isUS(id)) {
      return false;
    }
    switch (id) {
      case "America/Dominica":
      case "Europe/Isle_of_Man":
      case "America/Grenada":
      case "Indian/Cocos":
      case "Asia/Rangoon":
      case "Europe/Jersey":
      case "Europe/London":
      case "America/Belize":
      case "America/Cayman":
      case "America/Nassau":
      case "Europe/Guernsey":
        return false;
      default:
        return true;
    }
  };

  /**
   * Get default map view based on time zone
   * @param userContinent {string} - the continent
   * @returns {Array} - the map views
   */
  var getMapViewsByTimeZone = function (userContinent) {
    var mapViews = [];
    var MapView = function (n, x, y, w, h) {
      return {
        name: n,
        "viewport": {
          "x": x,
          "y": y,
          "width": w,
          "height": h
        }
      };
    };

    switch (userContinent) {
      case continent.Africa:
        mapViews.push(new MapView("Africa", -53.2177734375, 37.544578552246094, 145.546875, -72.897796630859375));
        break;
      case continent.Asia:
        mapViews.push(new MapView("Asia", 18.5888671875, 56.170024871826172, 145.546875, -66.311958312988281));
        break;
      case continent.Australia:
        mapViews.push(new MapView("Australia", 106.3916015625, -11.523087501525879, 72.7734375, -33.689914703369141));
        break;
      case continent.Europe:
        mapViews.push(new MapView("Europe", -23.994140625, 60.500526428222656, 72.7734375, -25.614595413208008));
        break;
      case continent.NorthAmerica:
        mapViews.push(new MapView("North America", -172.7490234375, 68.089706420898437, 145.546875,  -52.593677520751953));
        break;
      case continent.SouthAmerica:
        mapViews.push(new MapView("South America", -129.4189453125, 14.562317848205566, 145.546875, -68.128730773925781));
        break;
      default:
        mapViews.push(new MapView("World", -144.4921875, 72.046836853027344, 291.09375, -117.44528961181641));
        break;
    }
    return mapViews;
  };

  var local = {
    getContinentByTimeZone: getContinentByTimeZone,
    getDateTimeFormatByTimeZone: getDateTimeFormatByTimeZone,
    getFuelEconomyUnitByTimeZone: getFuelEconomyUnitByTimeZone,
    getIsMetricByTimeZone: getIsMetricByTimeZone,
    getMapViewsByTimeZone: getMapViewsByTimeZone
  };

  if(!window.geotab){
    window.geotab = {};
  }

  window.geotab.local = local;

  return local;
}());

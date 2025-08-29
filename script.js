const clientId = '1fw8yuj9fmmw5vp9v2u5zpfiwiwesu';
const accessToken = 'cs4sk9zml93lj88m0fxzeayf3fqc8n';

const streamers = [
  { name: "ermixone_", url: "https://www.twitch.tv/ermixone_" },
  { name: "sicarium250", url: "https://www.twitch.tv/sicarium250" },
  { name: "andrijpg_", url: "https://www.twitch.tv/andrijpg_" },
  { name: "str3gons__", url: "https://www.twitch.tv/str3gons__" },
  { name: "th3blink", url: "https://www.twitch.tv/th3blink" },
  { name: "metargon", url: "https://www.twitch.tv/metargon" },
  { name: "imnicoo_", url: "https://www.twitch.tv/imnicoo_" },
  { name: "imgiovyy", url: "https://www.twitch.tv/imgiovyy" },
  { name: "less16__", url: "https://www.twitch.tv/less16__" },
  { name: "poenico", url: "https://www.twitch.tv/poenico" },
  { name: "subbo_00", url: "https://www.twitch.tv/subbo_00" },
  { name: "blazecube_21", url: "https://www.twitch.tv/blazecube_21" },
  { name: "nocturniverse", url: "https://www.twitch.tv/nocturniverse" },
  { name: "d3struct10ntv", url: "https://www.twitch.tv/d3struct10ntv" },
  { name: "noluuke", url: "https://www.twitch.tv/noluuke" },
  { name: "keenzoo__", url: "https://www.twitch.tv/keenzoo__" },
  { name: "alb3x_official", url: "https://www.twitch.tv/alb3x_official" },
  { name: "maxibinn", url: "https://www.twitch.tv/maxibinn" },
  { name: "sussosioilpazzo", url: "https://www.twitch.tv/sussosioilpazzo" },
  { name: "itzmezii", url: "https://m.twitch.tv/itzmezii/" },
  { name: "hemlock_noir_", url: "https://www.twitch.tv/hemlock_noir_" },
  { name: "mominillithegamer", url: "https://www.twitch.tv/Mominillithegamer" },
  { name: "francescoangelov", url: "https://www.twitch.tv/realfrancii" },
  { name: "thatismose", url: "https://www.twitch.tv/thatis_killa" },
  { name: "korxyfn", url: "https://www.twitch.tv/korxyfn" },
  { name: "ilchrissone", url: "https://www.twitch.tv/ilchrissone" },
  { name: "taric_one", url: "https://www.twitch.tv/taric_one" },
  { name: "simoo", url: "https://www.twitch.tv/simoooyt" }
];

const liveContainer = document.getElementById('live-streams');
const offlineContainer = document.getElementById('offline-streamers');
const counterDiv = document.getElementById('stream-counter'); // Titolo da aggiornare

async function getStreams() {
  const query = streamers.map(s => `user_login=${s.name}`).join('&');
  const parentDomain = window.location.hostname;

  const response = await fetch(`https://api.twitch.tv/helix/streams?${query}`, {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  const onlineStreamers = data.data.map(s => s.user_login.toLowerCase());

  liveContainer.innerHTML = '';
  offlineContainer.innerHTML = '';

  let onlineCount = 0;

  streamers.forEach(({name, url}) => {
    if (onlineStreamers.includes(name.toLowerCase())) {
      onlineCount++;
      const iframe = document.createElement('iframe');
      iframe.src = `https://player.twitch.tv/?channel=${name}&parent=${parentDomain}`;
      iframe.allowFullscreen = true;

      liveContainer.appendChild(iframe);
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = name;
      offlineContainer.appendChild(a);
    }
  });

  // Aggiorna il titolo con il counter
  counterDiv.textContent = `Streamer online: ${onlineCount} / ${streamers.length}`;
}

getStreams();

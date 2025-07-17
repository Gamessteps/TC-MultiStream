const clientId = '1fw8yuj9fmmw5vp9v2u5zpfiwiwesu';
const accessToken = 'cs4sk9zml93lj88m0fxzeayf3fqc8n';

const streamers = [
  "ermixone_",
  "sicarium250",
  "andrijpg_",
  "str3gons__",
  "th3blink",
  "metargon",
  "imnicoo_",
  "imgiovyy",
  "less16__",
  "poenico",
  "subbo_00",
  "blazecube_21",
  "nocturniverse",
  "d3struct10ntv",
  "omcandy92"
];

const liveContainer = document.getElementById('live-streams');
const offlineContainer = document.getElementById('offline-streamers');

async function getStreams() {
  const query = streamers.map(name => `user_login=${name}`).join('&');

  const response = await fetch(`https://api.twitch.tv/helix/streams?${query}`, {
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  const onlineStreamers = data.data.map(s => s.user_login.toLowerCase());

  streamers.forEach(name => {
    if (onlineStreamers.includes(name.toLowerCase())) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://player.twitch.tv/?channel=${name}&parent=gamessteps.github.io`;
      iframe.allowFullscreen = true;

      const div = document.createElement('div');
      div.classList.add('stream');
      div.appendChild(iframe);
      liveContainer.appendChild(div);
    } else {
      const div = document.createElement('div');
      div.classList.add('offline-name');
      div.textContent = name;
      offlineContainer.appendChild(div);
    }
  });
}

getStreams();

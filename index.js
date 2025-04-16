async function isChannelLive(channelName) {
  const url = 'https://gql.twitch.tv/gql';
  const headers = {
    'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify([{
    operationName: 'VideoPlayerStatusOverlayChannel',
    query: 'query VideoPlayerStatusOverlayChannel($channel: String!) { user(login: $channel) { id stream { id type __typename } __typename }}',
    variables: { channel: channelName },
  }]);

  const response = await fetch(url, { method: 'POST', headers, body });
  const json = await response.json();
  const stream = json[0]?.data?.user?.stream;
  if (stream && stream.type === 'live' && stream.__typename === 'Stream') {
    return { live: true, type: stream.type };
  } else {
    return { live: false };
  }
}

isChannelLive('xQc')
  .then(status => console.log(`Live: ${status.live}`))
  .catch(err => console.error(err));
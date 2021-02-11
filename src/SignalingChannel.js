/**
 * This file demonstrates the process of creating a KVS Signaling Channel.
 */
async function createSignalingChannel(props) {
  // Create KVS client
  const kinesisVideoClient = new AWS.KinesisVideo({
    region: props.region,
    accessKeyId: props.accessKeyId,
    secretAccessKey: props.secretAccessKey,
    sessionToken: props.sessionToken,
    endpoint: props.endpoint,
  });

  // Get signaling channel ARN
  await kinesisVideoClient
    .createSignalingChannel({
      ChannelName: props.channelName,
    })
    .promise();

  // Get signaling channel ARN
  const describeSignalingChannelResponse = await kinesisVideoClient
    .describeSignalingChannel({
      ChannelName: props.channelName,
    })
    .promise();
  const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
  console.log("[CREATE_SIGNALING_CHANNEL] Channel ARN: ", channelARN);
}

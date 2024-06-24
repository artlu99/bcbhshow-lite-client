import { mockedAllChannelsResponse } from '@app/api/mocks/allChannels.api.mock';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

mockedAllChannelsResponse.result.channels.forEach((channel) => {
  httpApiMock.onPost('getChannelById', { channelId: channel.id }).reply(200, {
    result: {
      channel,
    },
  });
});

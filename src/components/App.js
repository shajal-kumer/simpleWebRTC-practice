import React from 'react';
import ContentEditable from 'react-contenteditable';

import {
  Provider,
  Connected,
  Connecting,
  Disconnected,
  Room,
  RequestUserMedia,
  RequestDisplayMedia,
  RemoteAudioPlayer,
  MediaControls,
  UserControls,
  Video,
  PeerList,
  GridLayout,
  ChatComposers,
  ChatList,
  ChatInput
} from '@andyet/simplewebrtc';

import {
  StyledUIContainer,
  StyledChatContainer,
  StyledChatInputContainer,
  StyledVideoContainer,
  StyledMessageMetadata,
  StyledMessage,
  StyledTimestamp,
  StyledToolbar,
  StyledTyping,
  StyledDisplayName,
  StyledMessageGroup,
  StyledMainContainer,
  StyledChatListContainer
} from './Styles';

const App = ({ configUrl, userData, roomName, roomPassword }) => (
  <Provider configUrl={configUrl} userData={userData}>
    <RemoteAudioPlayer />

    <Connected>
      <RequestUserMedia audio video auto />

      <Room name={roomName} password={roomPassword}>
        {({ room, peers, localMedia, remoteMedia }) => {
          const remoteVideos = remoteMedia.filter(m => m.kind === 'video');
          const localVideos = localMedia.filter(
            m => m.kind === 'video' && m.shared
          );
          const localScreens = localVideos.filter(m => m.screenCapture);

          return (
            <StyledUIContainer>
              <GridLayout
                className='videogrid'
                items={[...localVideos, ...remoteVideos]}
                renderCell={item => <Video media={item} />}
              />
            </StyledUIContainer>
          );
        }}
      </Room>
    </Connected>
  </Provider>
);

export default App;

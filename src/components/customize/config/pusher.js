// import Pusher from 'pusher-js/react-native';
// import config from './config';

// Pusher.logToConsole= true;
// export var pusher = new Pusher(config.pusher_key, {
//     cluster: 'ap1',
//     forceTLS: true ,
//     authEndpoint: config.baseUrl+'pusher/auth',
//     authTransport: 'ajax'
// });

// export function channelAccount(id){ 
//     return pusher.subscribe(`account-`+id)
// };

// channelAccount.bind('pusher:subscription_error', (status) => {
    
//     console.log("pusher connection status:" +status);
// })

// channelAccount.bind('pusher:subscription_succeeded', (status) => {
//     console.log('================================');
//     console.log("pusher connection status:" +status);
// })

// export const disconnectPusher= _=>{
//     pusher.disconnect();
// }
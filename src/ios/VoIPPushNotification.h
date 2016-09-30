#import <Cordova/CDV.h>
#import <PushKit/PushKit.h>

@interface VoIPPushNotification : CDVPlugin <PKPushRegistryDelegate>

@property (nonatomic, copy) NSString *VoIPPushCallbackId;
- (void)init:(CDVInvokedUrlCommand*)command;

@end
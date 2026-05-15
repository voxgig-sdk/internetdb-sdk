package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewInfoIpGetEntityFunc func(client *InternetdbSDK, entopts map[string]any) InternetdbEntity


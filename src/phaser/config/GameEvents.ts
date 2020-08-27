enum GameEvents {
	PreloadFinished = 'PRELOAD_FINISHED',
	TopmostPlatformDestroyed = 'TOPMOST_PLATFORM_DESTROYED',
	TopmostPlatformChanged = 'TOPMOST_PLATFORM_CHANGED',
	OnDamage = 'ON_DAMAGE',
	OnDepthChanged = 'ON_DEPTH_CHANGED',
	OnMoneyChanged = 'ON_GOLD_CHANGED',
	OnUpgradeIssued = 'ON_UPGRADE_ISSUED',
	OnUpgradeDone = 'ON_UPGRADE_DONE',
	OnItemAcquired = 'ON_ITEM_ACQUIRED'
}

export default GameEvents;

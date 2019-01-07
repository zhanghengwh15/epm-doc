# Quartz源码——JobStore保存JonDetail和Trigger源码分析

**问题描述**
不停的报时间的错误。


``` java

public void storeJobAndTrigger(final JobDetail newJob,
            final OperableTrigger newTrigger) 
        throws JobPersistenceException {
        executeInLock(
            (isLockOnInsert()) ? LOCK_TRIGGER_ACCESS : null,
            new VoidTransactionCallback() {
                public void executeVoid(Connection conn) throws JobPersistenceException {
                    //（1）保存JobDetail
                    storeJob(conn, newJob, false);
                    //（2）保存Trigger
                    storeTrigger(conn, newTrigger, newJob, false,
                            Constants.STATE_WAITING, false, false);
                }
            });
    }

```

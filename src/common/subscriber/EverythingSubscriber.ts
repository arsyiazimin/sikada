import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { RequestContext } from './RequestContext';

@EventSubscriber()
export class EverytingSubscriber implements EntitySubscriberInterface {

    constructor(
    ) { }
    /**
     * called before entity insertion
     */
    // beforeInsert(event: InsertEvent<any>) {
    //     console.log(`BEFORE ENTITY INSERTED: `,event.entity);
    // }

    // /**
    //  * Called before entity insertion
    //  */
    // beforeUpdate(event: UpdateEvent<any>) {
    //     const oldVal = event.databaseEntity;
    //     const newVal = event.entity;

    //     console.log(`BEFORE ENTITY UPDATE: `, event.databaseEntity);
    // }

    /**
     * called before entity insertion
     */
    // beforeRemove(event: RemoveEvent<any>) {
    //     console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED:`, event.entity);
    // }

    /**
     * called after entity insertion
     */
    async afterInsert(event: InsertEvent<any>) {
        var newValue = event.entity;
        if (newValue.constructor.name != 'UserForgot' && newValue.constructor.name != 'User' && newValue.constructor.name != 'LoginLog') {
            for (var key in newValue) {
                if (Array.isArray(newValue[key])) {
                    continue;
                }
                var valReturn = await this.activeLog(event, 'SET', newValue, key, newValue[key], '');
                if (valReturn == 1) {
                    return;
                }
            }
        }
    }
    /**
     * called after entity updated
     */
    async afterUpdate(event: UpdateEvent<any>) {
        var oldValue = event.databaseEntity;
        var newValue = event.entity;
        var body = RequestContext.currentBody()
        var entityName = newValue.constructor.name;
        if (newValue.constructor.name != 'UserForgot' && newValue.constructor.name != 'User') {

            for (let i = 0; i < event.updatedColumns.length; i++) {
                let key = event.updatedColumns[i].propertyAliasName;
                var old = (oldValue[key]) ? oldValue[key] : '';
                if (newValue[key] != old) {
                    await this.activeLog(event, 'CHANGE', newValue, key, newValue[key], old);
                }
            }

        } else {
            return;
        }
    }


    /**
     * Called after entity is loaded.
     */
    async afterRemove(event: RemoveEvent<any>) {
        var oldEntity = event.databaseEntity;
        // var newEntity = event.entity;

        for (var key in oldEntity) {
            // var old = (oldEntity[key]) ? oldEntity[key] : '';
            await this.activeLog(event, 'DELETE', oldEntity, key, '', oldEntity[key]);     // newEntity[key] --> NEW VALUE
        }
    }

    /**
    * Called after entity is loaded.
    */
    // afterLoad(entity: any) {
    //     let currentUser = RequestContext.currentUser();
    //     // if(!currentUser) {
    //     //     throw new Error("Unknown user Context");
    //     // } 
    //     if(currentUser) {
    //         console.log(currentUser.LOGIN_ID);
    //     }
    //     console.log(`AFTER ENTITY LOADED: `, entity);
    // }

    async activeLog(event, action, entityValue, key, value, old) {
        var entityName = entityValue.constructor.name;
        let currentUser = (RequestContext.currentUser() !== null) ? RequestContext.currentUser().LOGIN_ID : 171;
        var fieldPrimary = event.manager.connection.getMetadata(entityName).primaryColumns[0].databaseName;
        var idPrimary = entityValue[fieldPrimary];
        let parentID = null;
        let manager = event.queryRunner.manager;
        return 1;
    }
}
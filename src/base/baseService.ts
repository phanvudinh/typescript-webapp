type callbackFunction = (eventData: any) => void;

export default abstract class BaseService {
    private callbackList: callbackFunction[] = [];
    
    public subscribe(target: BaseService, callback: callbackFunction){
        target.callbackList.push(callback);
    }

    public broadcastEvent(eventData){
        this.callbackList.forEach(callback => {
            callback(eventData)
        });
    }
}
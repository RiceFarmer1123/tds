import { Flamework, Modding, OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

interface Melee extends Instance {}

let Combat = Modding.createMetaDecorator<[string]>("Class");
Combat = Modding.createDecorator<[string]>("Class", (descriptor, [name]) => {
	print("Decorated object", descriptor.object);
	print("Passed in name:", name);
});

@Combat("Melee")
@Component({
    tag: "Melee"
})
export class MeleeClass extends BaseComponent<{}, Melee> implements OnStart {
    onStart() {
        
    }

    
}
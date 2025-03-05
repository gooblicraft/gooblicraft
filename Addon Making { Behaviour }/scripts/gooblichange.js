import { Player, world } from "@minecraft/server";

// Custom Component for 2 variants
// 05/03/2025 - added particles and sound when interacted
world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent("goobli:change2", {
        onPlayerInteract: e => {
            const {player, block, dimension} = e;
            const blockCenter = block.center();
            const variant = block.permutation.getState("goobli:variant"); //"goobli:variant" is the block state ("states") you made in your block BP
            const tool = player.getComponent('equippable').getEquipment('Mainhand');

            switch (tool.typeId) {
                case ('minecraft:stick'):
                    switch(variant) {
                        case 0:
                            block.setPermutation(block.permutation.withState("goobli:variant", 1))
                            dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
                            dimension.playSound("item.bone_meal.use", block.center());
                            break;
                        case 1:
                            block.setPermutation(block.permutation.withState("goobli:variant", 0))
                            dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
                            dimension.playSound("item.bone_meal.use", block.center());
                            break;
                    }
                break;
            }
        }
    });
});

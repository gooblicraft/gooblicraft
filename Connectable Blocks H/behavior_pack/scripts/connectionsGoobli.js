import { world } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('goobli:connected', {
        onPlace(e) {
            const { block } = e;
            const hilaga = block.north();
            const timog = block.south();
            const kanluran = block.west();
            const silangan = block.east();
            const tags = block.getTags();

            const hasCommonTag = (blockState) => {
                const neighborTags = blockState.getTags();
                return tags.some(tag => neighborTags.includes(tag));
            };

            if (hilaga && hasCommonTag(hilaga)) {
                hilaga.setPermutation(hilaga.permutation.withState('goobli:south_neighbor', 1));
                block.setPermutation(block.permutation.withState('goobli:north_neighbor', 1));
            }
            if (timog && hasCommonTag(timog)) {
                timog.setPermutation(timog.permutation.withState('goobli:north_neighbor', 1));
                block.setPermutation(block.permutation.withState('goobli:south_neighbor', 1));
            }
            if (kanluran && hasCommonTag(kanluran)) {
                kanluran.setPermutation(kanluran.permutation.withState('goobli:east_neighbor', 1));
                block.setPermutation(block.permutation.withState('goobli:west_neighbor', 1));
            }
            if (silangan && hasCommonTag(silangan)) {
                silangan.setPermutation(silangan.permutation.withState('goobli:west_neighbor', 1));
                block.setPermutation(block.permutation.withState('goobli:east_neighbor', 1));
            }
        }
    });
});
world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('goobli:connects', {
        onPlayerDestroy(e) {
            const { block } = e;
            const hilaga = block.north();
            const timog = block.south();
            const kanluran = block.west();
            const silangan = block.east();

             // Pengecekan state pada neighbors
             if (hilaga) {
                const statehilaga = hilaga.permutation.getState('goobli:south_neighbor');
                if (statehilaga) {
                    hilaga.setPermutation(hilaga.permutation.withState('goobli:south_neighbor', 0));
                }
            }

            if (timog) {
                const statetimog = timog.permutation.getState('goobli:north_neighbor');
                if (statetimog) {
                    timog.setPermutation(timog.permutation.withState('goobli:north_neighbor', 0));
                }
            }

            if (kanluran) {
                const statekanluran = kanluran.permutation.getState('goobli:east_neighbor');
                if (statekanluran) {
                    kanluran.setPermutation(kanluran.permutation.withState('goobli:east_neighbor', 0));
                }
            }

            if (silangan) {
                const statesilangan = silangan.permutation.getState('goobli:west_neighbor');
                if (statesilangan) {
                    silangan.setPermutation(silangan.permutation.withState('goobli:west_neighbor', 0));
                }
            }
        }
    });
});

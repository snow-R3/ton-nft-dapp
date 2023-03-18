import { Address, beginCell, toNano } from 'ton-core';
import { OrderCollection } from '../wrappers/OrderCollection';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import { randomAddress } from './helpers/randomAddr';
import { NftItemCodeCell } from './helpers/nftItemCode';
import { randomSeed } from './helpers/randomSeed';

export async function run(provider: NetworkProvider) {
    const orderCollection = OrderCollection.createFromConfig(
        {
            ownerAddress: Address.parse("EQBEMxgQUG00VwOAvmPYfZbOQwllVU5zEIahLLKmtej43K3Y"), // owner address is equal to dapp address
            nextItemIndex: 0,
            content: beginCell().storeUint(randomSeed, 256).endCell(),
            nftItemCode: NftItemCodeCell,
            royaltyParams: beginCell()
                            .storeUint(12, 16)
                            .storeUint(100, 16) // 1,2 %
                            .storeAddress(randomAddress())
                            .endCell()
        }, 
        await compile('OrderCollection')
    );

    await provider.deploy(orderCollection, toNano('0.05'));

}

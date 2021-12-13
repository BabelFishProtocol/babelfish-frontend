import React from 'react'
import { ButtonPrimary } from '../../lib/components'
import * as S from './styles'
import { useWeb3Context } from '../../web3/context';

interface IProps {
    correctNetwork: string;
}

export default function ChangeNetworkOverlay({ correctNetwork }: IProps) {
    const { state: { web3, chainId } } = useWeb3Context();
    const ethereumProvider = (window as any).ethereum;
    async function switchNetwork(newChain: string) {
        const formatedChain = '0x' + Number(newChain).toString(16)
        return ethereumProvider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: formatedChain }] });
    }
    const handleChangeNetwork = async () => {
        if (web3) {
            switchNetwork(correctNetwork)
        }
    }
    return (
        <>
            {
                correctNetwork === chainId ?
                    null
                    :
                    <S.OverlayContainer>
                        <div className='d-flex flex-column'>
                            <span className='mb-2'>Change your current Network to be able to Redeem</span>
                            <ButtonPrimary onClick={() => handleChangeNetwork()} className='px-5'>Change Network</ButtonPrimary>
                        </div>
                    </S.OverlayContainer>
            }
        </>
    )
}

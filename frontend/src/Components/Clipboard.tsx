import {
    useClipboard,
    Tooltip,
    IconButton,
    useColorModeValue
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface clipBoardInterface {
    toCopy: string,
    icon: IconType,
    type: string
}

export default function Clipboard(props: clipBoardInterface) {

    const { onCopy, hasCopied } = useClipboard(props.toCopy);

    return (
        <Tooltip
            label={hasCopied ? `${props.type} Copied!` : `Copy ${props.type}`}
            closeOnClick={false}
            hasArrow>
            <IconButton
                aria-label={props.type}
                variant="ghost"
                size="lg"
                fontSize="3xl"
                icon={<props.icon />}
                _hover={{
                    bg: 'blue.500',
                    color: useColorModeValue('white', 'gray.700'),
                }}
                onClick={onCopy}
                isRound
            />
        </Tooltip>
    );
}

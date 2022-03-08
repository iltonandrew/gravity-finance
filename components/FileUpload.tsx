import { Avatar, Button, Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ImageUpload() {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState<string>()

    let hiddenInput: any = null;

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        console.log(selectedFile)
    }

    return (
        <Flex align="center" direction={'column'}>

            {selectedFile &&
                <Avatar src={preview}></Avatar>}


            <Button 
                // previously written code...
                onClick={() => hiddenInput?.click()}
            >
                Upload Photo     
            </Button>

            <input
                hidden
                type='file'
                ref={el => hiddenInput = el}
                onChange={onSelectFile}
            />
        </Flex>
    )
    
}
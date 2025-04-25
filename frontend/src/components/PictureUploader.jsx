import { useState, useRef } from 'react';
import { Box, Button, Flex, Image, Input, useToast } from '@chakra-ui/react';
import originalImage from '../../../backend/uploads/anonimousUser.jpg';
import loadingGif from '../../../backend/uploads/loading.gif'

export const PictureUploader = ({ serviceProvider, setImage, imageUrl }) => {
    const [selectedFile, setSelectedFile] = useState(originalImage);
    const [previewUrl, setPreviewUrl] = useState(imageUrl);

    const toast = useToast();
    const fileUploadRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        const res = await fetch('/api/serviceProviders/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();

        setImage(data.filePath);

        toast({
            title: "Image succesfully uploaded",
            description: "If you completed all the fields you can proceed",
            status: 'success',
            isClosable: true
        })
    };

    return (
        <Box border="1px solid" borderColor="gray.300" w={'100%'} alignContent={'center'}>
            <Flex direction="column"
                align="center"
                justify="center"
                mt={8}>
                <Input ref={fileUploadRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    width="auto"
                    mb={4}
                />
                {previewUrl && <Image src={previewUrl} boxSize="150px" objectFit="contain" borderRadius="full" />}
                <Button as="span" mt={2} onClick={() => handleUpload()}
                    colorScheme="teal"
                    justify={'center'}>
                    Upload image
                </Button>
            </Flex>
        </Box>
    );
};

export default PictureUploader;
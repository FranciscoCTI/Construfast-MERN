import { useState, useRef } from 'react';
import { Box, Button, Flex, Image, Input, useToast } from '@chakra-ui/react';
import originalImage from '../../../backend/uploads/anonimousUser.jpg';
import loadingGif from '../../../backend/uploads/loading.gif'
import { useServiceProviderStore } from '../store/serviceProvider';

export const PictureUploader = ({ serviceProvider, setImage }) => {
    const [selectedFile, setSelectedFile] = useState(originalImage);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadedURL, setUploadedURL] = useState();
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

        console.log(data);
    };

    return (
        <Box border="1px solid" borderColor="gray.300" w={'100%'} alignContent={'center'}>
            <Flex justify="center" align="center">
                <Input ref={fileUploadRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    align={'start'}
                />
            </Flex>
            {previewUrl && <Image src={previewUrl} boxSize="150px" borderRadius="full" />}
            <Button as="span" mt={2} onClick={() => handleUpload()}
                colorScheme="teal"
                justify={'center'}>
                Upload
            </Button>
        </Box>
    );
};

export default PictureUploader;
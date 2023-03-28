import * as React from 'react';

import { Typography, CardContent, Card, CardMedia, CardActionArea } from '@mui/material';
import TokenDetail from './TokenDetail';

export default function MediaCard({ token }) {
  const { image, name, description, collectionInfo } = token;
  const [show, setShow] = React.useState(false);
  const imageSrc = (image ?? '').replace('ipfs://', 'https://gateway.ipfs.io/ipfs/');

  return (
    <>
      <Card>
        <CardActionArea
          onClick={() => {
            setShow(true);
          }}
        >
          <CardMedia sx={{ height: 300 }} image={imageSrc} title="NFT image" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name ?? 'NFT Title'}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {collectionInfo?.name ?? 'Collection'}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
              }}
            >
              {description ?? 'NFT description'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <TokenDetail
        token={token}
        show={show}
        handleClose={() => {
          setShow(false);
        }}
      />
    </>
  );
}

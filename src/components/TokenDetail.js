/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable camelcase */
import React, { useState } from "react";

// @mui
import {
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  // Menu,
  // MenuItem,
  Modal,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";
import Ratio from "react-ratio";
import {
  MusicNote,
  Description,
  LiveTv,
  Folder,
  // Star,
  Image,
  ViewInAr,
  Code,
  FontDownload,
  HelpCenter,
  ExpandLess,
  FolderZip,
  ExpandMore,
  // MoreVert,
  Download,
} from "@mui/icons-material";
// import ConnectPopover from '../components/ConnectPopover';

// components
import TokenInfo from "./TokenInfo";

// IPFS LIST
export default function MediaDetail({ token, show, handleClose }) {
  const { name, files, downloadUrl } = token;

  const style = {
    position: "absolute",
    // top: "10%",
    // left: "10%",
    // transform: "translate(-5%, -5%)",
    width: "100%",
    height: "100%",
    bgcolor: "background.paper",
    borderRadius: "1%",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Token Details</Typography>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              sx={{ height: "50%" }}
            >
              <Typography level="h2" variant="h3" component="div">
                {name ?? "Token Name"}
              </Typography>

              <TokenEmbed token={token} />

              <TokenInfo token={token} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography level="h2" variant="h3" component="div">
              Files & assets
            </Typography>
            <Typography variant="body2" component="div" color="text.secondary">
              Documents and attachments that have been uploaded as part of your
              current tokens.
            </Typography>
            <List>
              {(files ?? []).map((file) => (
                <FileRow key={file?.name} file={file} />
              ))}
            </List>
            {!files && (
              <div>
                <Typography variant="h6" align="center">
                  No Assets...
                </Typography>
                <Typography color="text.secondary" align="center">
                  At least, not yet!
                </Typography>
              </div>
            )}
            {downloadUrl && (
              <Button variant="contained" fullWidth href={downloadUrl} download>
                Download Zip
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

const FileRow = ({ file }) => {
  const extForFile = (file) => {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(file?.path)[1];
    return ext;
  };

  const isFolder = (file) => extForFile(file) == null;

  const FileIcon = ({ file }) => {
    const ext = extForFile(file);

    // Folder
    if (!ext) return <Folder />;

    // music
    switch (ext.toLowerCase()) {
      // Images
      case "png":
      case "jpg":
      case "jpeg":
      case "webp":
      case "ico":
      case "pdf":
      case "gif":
        return <Image />;

      // Audio
      case "mp3":
      case "aif":
      case "wav":
        return <MusicNote />;

      // Video
      case "m4a":
      case "m4v":
      case "mp4":
      case "mov":
        return <LiveTv />;

      // Archive:
      case "zip":
        return <FolderZip />;

      // 3D / AR
      case "hdr":
      case "glb":
      case "gltf":
        return <ViewInAr />;

      // Developer
      case "js":
      case "html":
      case "css":
      case "php":
      case "json":
        return <Code />;

      // Fonts
      case "ttf":
        return <FontDownload />;

      case "txt":
      case "md":
      case "docx":
        return <Description />;

      // File
      default:
        return <HelpCenter />;
    }
  };

  const IPFSFolder = ({ file }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <ListItemButton
          key={`${file?.name}-row`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText primary={file?.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          key={`${file?.name}-children`}
        >
          <List component="div" disablePadding sx={{ paddingLeft: "32px" }}>
            {(file?.files ?? []).map((file) => (
              <FileRow file={file} key={`${file?.name}-row`} />
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const IPFSFile = ({ file }) => (
    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => setAnchorEl(event.currentTarget);
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };

    // const handleDownload = () => {};

    <>
      <ListItem
        disablePadding
        secondaryAction={
          <>
            {/* <IconButton aria-label="comment">
                <Star />
              </IconButton> */}
            {file.downloadUrl && (
              <IconButton aria-label="more" href={file.downloadUrl ?? "#"}>
                <Download />
              </IconButton>
            )}
          </>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <FileIcon file={file} />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItemButton>
      </ListItem>
      {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Preview</MenuItem>
          <MenuItem onClick={handleClose}>Download</MenuItem>
        </Menu> */}
    </>
  );
  return isFolder(file) ? <IPFSFolder file={file} /> : <IPFSFile file={file} />;
};

const TokenEmbed = ({ token }) => {
  const { image, name, animation_url, contentType } = token;
  const imageSrc = (animation_url ?? image ?? "").replace(
    "ipfs://",
    "https://fenneckit.infura-ipfs.io/ipfs/"
  );

  const Content = () => {
    switch (contentType) {
      case "html":
        return (
          <embed
            alt={name ?? ""}
            title={name ?? ""}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FFFFFF00",
            }}
            src={imageSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        );
      default:
        return (
          <video width="100%" height="auto" controls>
            <source src={imageSrc} type="video/mp4" />
          </video>
        );
    }
  };

  return (
    <Ratio ratio={1}>
      <Content />
    </Ratio>
  );
};

import React, {useState, useRef, useEffect} from 'react';

// material ui components
import { Grid, Paper, makeStyles, Typography, IconButton, Box  } from '@material-ui/core';

// Image
import MusicPlayerIMG from './Music Player.png';

// material ui icon
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

const useStyles = makeStyles ((theme) =>({
    root: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        background: '#FC427B',
        borderRadius: '5%',
        marginTop: theme.spacing(10),
    },
    image: {
        width: theme.spacing(30),
        borderRadius: '50%',
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(2),
    },
    texts: {
        marginTop: theme.spacing(2),
    }
}));

function MusicPlayer() {
    const classes = useStyles();
    const [songs] = useState([
        {
            title: "All Around The World",
            artist: "A Touch of Class",
            src: "https://dl2.beelody.com/Free/2020/7/Ultimate%20Summer%20Party/01%20All%20Around%20The%20World%20%28La%20La%20La%29%20%28R3HAB%29.mp3"
        },
        {
            title: "Jubel",
            artist: "Klingande",
            src: "https://dl2.beelody.com/Free/2020/7/Ultimate%20Summer%20Party/02%20Jubel%20%28Radio%20Edit%29%20%28Klingande%29.mp3"
        },
        {
            title: "Waves",
            artist: "Mr.Probz",
            src: "https://dl2.beelody.com/Free/2020/7/Ultimate%20Summer%20Party/03%20Waves%20%28Robin%20Schulz%20Radio%20Edit%29%20%28Mr.%20Probz%29.mp3"
        },
        {
            title: "Cooler Than Me",
            artist: "Lucky Luke",
            src: "https://dl2.beelody.com/Free/2020/7/Ultimate%20Summer%20Party/04%20Cooler%20Than%20Me%20%28Lucky%20Luke%29.mp3"
        },
        {
            title: "Que Calor",
            artist: "Major Lazer",
            src: "https://dl2.beelody.com/Free/2020/7/Ultimate%20Summer%20Party/05%20Que%20Calor%20%28Major%20Lazer%29.mp3"
        }
    ]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNexttSongIndex] = useState(currentSongIndex + 1);
    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        };
    });
    const SkipSong = (forwards = true) => {
        if (forwards) {
            setCurrentSongIndex(() => {
                let temp = currentSongIndex;
                temp++;
                if (temp > songs.length - 1) {
                    temp = 0;
                };
                return temp;
            });
        } else {
            setCurrentSongIndex(() => {
                let temp = currentSongIndex;
                temp--;
                if (temp < 0) {
                    temp = songs.length - 1;
                };
                return temp;
            });
        };
    };
    
    useEffect(() => {
        setNexttSongIndex(() => {
            if (currentSongIndex + 1 > songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1;
            }
        });
    }, [songs.length, currentSongIndex]);
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    return (
        <Grid container spacing={1} direction="row" justify="center" alignItems="center" alignContent="center" wrap="nowrap">
            <Paper elevation={3} className={classes.root}>
                <audio src={songs[currentSongIndex].src } ref={audioEl}></audio>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Typography paragraph color="initial" className={classes.texts}>Music Player App</Typography>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center" >
                    <img src={MusicPlayerIMG} alt="music" className={classes.image}/>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant='h5' color="initial" className={classes.texts}>{songs[currentSongIndex].title}</Typography>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant='h6' color="initial" className={classes.texts}>{songs[currentSongIndex].artist}</Typography>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                        <IconButton  edge="start" size="medium" onClick={() => SkipSong(false)}>
                            <SkipPreviousIcon htmlColor="#0984e3" fontSize='large'/>
                        </IconButton>           
                        <IconButton  edge="start" size="medium" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <PauseCircleFilledIcon htmlColor="#0984e3" fontSize='large'/> 
                                        : <PlayCircleFilledIcon htmlColor="#0984e3" fontSize='large'/>}
                        </IconButton>
                        <IconButton  edge="start" size="medium" onClick={() => SkipSong()}>
                            <SkipNextIcon htmlColor="#0984e3" fontSize='large'/>
                        </IconButton> 
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Typography paragraph color="initial" className={classes.texts}>
                        <Box fontWeight="fontWeightBold" display="inline">Next up: </Box>{songs[nextSongIndex].title} by {songs[nextSongIndex].artist} 
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default MusicPlayer;
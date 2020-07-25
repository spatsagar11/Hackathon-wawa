import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { orderPreparedAction } from '../actions';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function SingleOrder(props) {
    const classes = useStyles();
    const {
        itemDesc = 'Mayo Sandwich',
        orderedQty = 2,
        orderNo = '10000001',
        itemID = '15072019112'
    } = props;
    const dispatch = useDispatch();

    const orderPrepared = () => {
        dispatch(orderPreparedAction(orderNo, itemID));
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {itemDesc}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                    Quantity: {orderedQty}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="h5">
                    Order No: {orderNo}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="h5">
                    Item id: {itemID}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" color="primary" onClick={orderPrepared}>
                    Order Prepared
                </Button>
            </CardActions>
        </Card>
    );
}


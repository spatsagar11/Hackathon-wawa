import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Throbber from 'components/Throbber';
import SingleOrder from './SingleOrder';
import { loadOrders, ordersSelector } from '../actions';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        background: '#F4F5F7',
        overflow: 'auto'
    },
    formwrap: {
        width: '670px',
        position: 'relative',
        background: theme.palette.common.white,
        '& .title': {
            margin: 20
        }
    },
    orderContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        gridGap: 20,
        padding: 20,
    }
});

const useStyles = makeStyles(styles);

export default function StationOrders() {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadOrders())
    }, [dispatch])
    const orders = useSelector(ordersSelector);
    return (
        <div className={classes.container}>
            <div className={classes.formwrap}>
                {orders.status === 'IN_PROGRESS' && <Throbber />}
                <Typography variant="h5" color="primary" className="title">Orders in Queue</Typography>
                <section className={classes.orderContainer}>
                    {orders.data
                        .filter(order => order.status === 'pending')
                        .map(order => <SingleOrder key={`${order.orderNo}_${order.itemID}`} {...order} />)}
                </section>
            </div>

        </div>
    );
}
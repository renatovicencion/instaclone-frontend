import React, { useState } from 'react';

import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LIKE, IS_LIKE, DELETE_LIKE, COUNT_LIKES } from './../../../../gql/like';

import './Actions.scss';

const Actions = ({ publication }) => {

    const [loadingAction, setLoadingAction] = useState(false);

    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);

    const { data, loading, refetch } = useQuery(IS_LIKE, {
        variables: {
            idPublication: publication.id,
        },
    });

    const { data: dataCountLikes, loading: loadingCountLikes, refetch: refetchCountLikes } = useQuery(COUNT_LIKES, {
        variables: {
            idPublication: publication.id
        },
    });

    const onAddLike = async () => {
        setLoadingAction(true);
        try {
            await addLike({
                variables: {
                    idPublication: publication.id,
                },
            });
            refetch();
            refetchCountLikes();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    };

    const onDeleteLike = async () => {
        setLoadingAction(true);
        try {
            await deleteLike({
                variables: {
                    idPublication: publication.id,
                },
            });
            refetch();
            refetchCountLikes();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    };

    const onAction = () => {
        if (!loadingAction) {
            if (isLike) {
                onDeleteLike();
            } else {
                onAddLike();
            }
        }
    };

    if (loading || loadingCountLikes) return null;
    const { isLike } = data;

    const { countLikes } = dataCountLikes;

    return (
        <div className="actions">
            <Icon  
                className={isLike ? "like active" : "like"}
                name={isLike ? "heart" : "heart outline"}
                onClick={onAction}
            />
            {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </div>
    );
};

export default Actions;

// Hooks
import { useState } from 'react';

// Adapters
import { createAdaptedUser } from '@/pages/signup/adapters/signup.adapter';

// Services
import { postData } from '@/services/postData';

// Next
import { useRouter } from 'next/router';

// Redux
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/userSlice';

export function useAuth() {
    const [error, setError] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    const signup = async user => {
        const adaptedUser = createAdaptedUser(user);

        try {
            await postData('users/signup', adaptedUser);
            dispatch(login(adaptedUser));
            router.push('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const loginUser = async credentials => {
        try {
            const response = await postData('users/login', credentials);
            dispatch(login(response));
            router.push('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return { error, signup, loginUser };
}

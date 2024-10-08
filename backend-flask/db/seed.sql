INSERT INTO public.users (
    display_name,
    handle,
    email,
    cognito_user_id
)
VALUES
    ('Andrew Brown', 'andrewbrown', 'andrewbrown@example.com.invalid', 'MOCK'),
    ('Andrew Bayko', 'andrewbayko', 'andrewbayko@example.com.invalid', 'MOCK'),
    ('Re Bar', 'rebar48202', 'rebar48202@morxin.com', 'MOCK'),
    ('Voko Ya', 'vokoya3664', 'vokoya3664@lapeds.com', 'MOCK');

INSERT INTO public.activities (
    user_uuid,
    message,
    expires_at
)
VALUES
    (
        (
            SELECT uuid
            FROM public.users
            WHERE users.handle = 'andrewbrown'
            LIMIT 1
        ),
        'This was imported as seed data!',
        current_timestamp + interval '10 day'
    );
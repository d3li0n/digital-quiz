--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answer" (
    id integer NOT NULL,
    answer text NOT NULL,
    "isCorrect" boolean NOT NULL,
    "questionId" integer NOT NULL
);


ALTER TABLE public."Answer" OWNER TO postgres;

--
-- Name: Answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Answer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Answer_id_seq" OWNER TO postgres;

--
-- Name: Answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Answer_id_seq" OWNED BY public."Answer".id;


--
-- Name: Question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Question" (
    id integer NOT NULL,
    title text NOT NULL,
    video_url text,
    image_url text,
    "quizId" integer NOT NULL
);


ALTER TABLE public."Question" OWNER TO postgres;

--
-- Name: Question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Question_id_seq" OWNER TO postgres;

--
-- Name: Question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Question_id_seq" OWNED BY public."Question".id;


--
-- Name: Quiz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Quiz" (
    id integer NOT NULL,
    title text NOT NULL,
    "shortDescription" text NOT NULL,
    published boolean NOT NULL,
    gradient text NOT NULL
);


ALTER TABLE public."Quiz" OWNER TO postgres;

--
-- Name: Quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Quiz_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Quiz_id_seq" OWNER TO postgres;

--
-- Name: Quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Quiz_id_seq" OWNED BY public."Quiz".id;


--
-- Name: Vote; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Vote" (
    id integer NOT NULL,
    "quizId" integer NOT NULL
);


ALTER TABLE public."Vote" OWNER TO postgres;

--
-- Name: Vote_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Vote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Vote_id_seq" OWNER TO postgres;

--
-- Name: Vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Vote_id_seq" OWNED BY public."Vote".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Answer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer" ALTER COLUMN id SET DEFAULT nextval('public."Answer_id_seq"'::regclass);


--
-- Name: Question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question" ALTER COLUMN id SET DEFAULT nextval('public."Question_id_seq"'::regclass);


--
-- Name: Quiz id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quiz" ALTER COLUMN id SET DEFAULT nextval('public."Quiz_id_seq"'::regclass);


--
-- Name: Vote id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vote" ALTER COLUMN id SET DEFAULT nextval('public."Vote_id_seq"'::regclass);


--
-- Data for Name: Answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Answer" (id, answer, "isCorrect", "questionId") FROM stdin;
1	A type of online scam where criminals send an email that appears to be from a legitimate company asking you to provide sensitive information	t	2
2	The process of encoding messages or information in such a way that only authorized parties can read it	f	2
3	A method used to increase the ranking of a website in search engines	f	2
4	The practice of sending emails purporting to be from reputable companies in order to induce individuals to reveal personal information, such as passwords and credit card numbers	f	2
5	An email with no links or attachments	f	3
6	An email that addresses you by your full name	f	3
7	An email that asks you to confirm personal information	t	3
8	An email from a known colleague with a relevant subject line	f	3
9	Click on all the links to see where they go	f	4
10	Reply and ask the sender if they sent the email	f	4
11	Forward the email to your friends to see what they think	f	4
12	Do not click on any links or download any attachments and report the email to your IT department	t	4
13	inheritance	f	5
14	insurance	f	5
15	invoice and payments	t	5
16	free money	f	5
17	Gift Card	t	6
18	Cheque	f	6
19	Cash	f	6
20	Credit Card	f	6
21	India	f	7
22	Russia	t	7
23	China	f	7
24	United States	f	7
25	2005	f	8
26	1996	f	8
27	2000	f	8
28	1994	t	8
29	A type of canned meat	f	10
30	Unsolicited messages sent in bulk over email	t	10
31	A type of computer virus	f	10
32	A programming term	f	10
33	They are always sent from known contacts	f	11
34	They are typically personalized to the recipient	f	11
35	They often contain generic greetings	t	11
36	They never contain links or attachments	f	11
37	To provide useful information to the recipient	f	12
38	To advertise products or services, often fraudulently	t	12
39	To spread positive messages and good vibes	f	12
40	To invite the recipient to a legitimate business opportunity	f	12
41	Asking people for their email address in person	f	13
42	Buying or trading lists of email addresses	t	13
43	 Looking up email addresses in the phone book	f	13
44	Guessing email addresses	f	13
45	 Respond to them asking to be removed from the list	f	14
46	Click on all links in the email to see where they go	f	14
47	Forward the email to all your contacts	f	14
48	Do not open them and mark them as spam	t	14
49	A tool for blocking unwanted emails based on certain criteria	t	15
50	A physical filter for removing spam from your inbox	f	15
51	A type of cooking utensil	f	15
52	A feature that makes spam emails more interesting to read	f	15
53	A robot that is programmed to send spam emails	t	16
54	A type of toy robot	f	16
55	A robot that is programmed to eat spam	f	16
56	A robot that is programmed to block spam emails	f	16
57	The practice of changing the sender’s name in an email to make it appear as though it came from another address	t	17
58	The practice of sending emails that appear to be from a reputable source in order to trick the recipient into revealing personal information	f	17
59	The practice of sending emails that contain jokes or spoofs	f	17
60	The practice of sending emails that contain false information	f	17
61	A trap set to detect, deflect or counteract attempts at unauthorized use of information systems	t	18
62	A type of software used to send spam emails	f	18
63	A sweet treat often found in spam emails	f	18
64	A tool used by spammers to collect email addresses	f	18
65	Yes, it is a phishing email	t	19
66	No, everything looks good	f	19
67	Citizenship in a virtual country	f	21
68	The responsible and ethical use of technology	t	21
69	Obtaining citizenship through online applications	f	21
70	True	f	22
72	Sharing someone else's personal information online without permission	f	23
73	Using strong passwords for online accounts	t	23
74	 Ignoring cyberbullying on social media	f	23
75	A form of online shopping	f	24
76	Sending unsolicited messages to strangers	f	24
77	Harassment or bullying carried out through digital devices	t	24
78	True	f	25
79	False	t	25
71	False	t	22
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id, title, video_url, image_url, "quizId") FROM stdin;
1	Phishing	https://www.youtube.com/embed/gWGhUdHItto?si=y2urIf7qKxB4KpNg	\N	1
2	What is phishing?	\N	\N	1
3	Which of the following is a common indicator of a phishing attempt?	\N	\N	1
4	What should you do if you receive an email that you think is a phishing attempt?	\N	\N	1
5	What is the most common form of phishing emails?	\N	\N	1
6	What is a common form of sending money in a scam?	\N	\N	1
7	What is the biggest country where phishing comes from?	\N	\N	1
8	When did the first phishing attack happen?	\N	\N	1
9	What is spam emails?	https://www.youtube.com/embed/bfklwaX7FNA?si=4GO-_H0MThUtULTR	\N	2
10	What is spam in the context of email?	\N	\N	2
11	Which of the following is a common characteristic of spam emails?	\N	\N	2
12	What is the purpose of most spam emails?	\N	\N	2
13	What is a common method used by spammers to collect email addresses?	\N	\N	2
14	What is the best way to deal with spam emails?	\N	\N	2
15	What is a spam filter?	\N	\N	2
16	What is a spam bot?	\N	\N	2
17	What is email spoofing?	\N	\N	2
18	What is a honeypot in the context of spam?	\N	\N	2
19	Can this email be considered as phishing attack?	\N	https://www.imperva.com/learn/wp-content/uploads/sites/13/2019/01/phishing-attack-email-example.png	1
20	Digital Citizenship Basics	https://www.youtube.com/embed/f4B0q2oOLbs?si=Px01TEazs0SzLLrx	\N	3
21	What is digital citizenship?	\N	\N	3
22	True or False: Digital citizenship only applies to adults	\N	\N	3
23	Which of the following is an example of good digital citizenship?	\N	\N	3
24	What is cyberbullying?	\N	\N	3
25	True or False: It's okay to download and share copyrighted content without permission as long as it's for personal use.	\N	\N	3
\.


--
-- Data for Name: Quiz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Quiz" (id, title, "shortDescription", published, gradient) FROM stdin;
1	Phishing	This quiz will test your knowledge on various aspects of phishing, a prevalent cyber threat	t	#43cea2,#185a9d
2	Spam Emails	This quiz will assess your understanding of spam, a common nuisance in the digital world	t	#86A8E7,#91EAE4
3	Digital Citizenship	This quiz covers essential topics such as understanding the impact of digital actions and promoting positive online interactions	t	#159957,#155799
\.


--
-- Data for Name: Vote; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Vote" (id, "quizId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
fc030c54-27d4-4ca1-a679-8fe39ed94432	dc5b14e1be3f1e3923c97ec3033bde8d22b3498ff2f04bee059dd5afce421781	2024-03-31 17:55:40.406884+00	20240323212034_init	\N	\N	2024-03-31 17:55:40.38689+00	1
2c66ed8e-a43c-4564-aeeb-9b52822ebf83	d5a7b7ee3759f67cc01a0d8282d45bf96c112c90e443039ff4e05ccd09c0b95b	2024-03-31 17:55:40.41542+00	20240323212414_quiz_gradient	\N	\N	2024-03-31 17:55:40.409044+00	1
06225192-5864-4c3d-9635-e70cc802f5f0	71644c48d50629031d54f515e35d5fa0cfbdcfef8c11597468cf94e8afd7a14c	2024-03-31 17:55:40.425129+00	20240327154153_vote_table	\N	\N	2024-03-31 17:55:40.417943+00	1
\.


--
-- Name: Answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Answer_id_seq"', 79, true);


--
-- Name: Question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Question_id_seq"', 25, true);


--
-- Name: Quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Quiz_id_seq"', 3, true);


--
-- Name: Vote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Vote_id_seq"', 1, false);


--
-- Name: Answer Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Quiz Quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Quiz"
    ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY (id);


--
-- Name: Vote Vote_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Answer Answer_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_quizId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES public."Quiz"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Vote Vote_quizId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES public."Quiz"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

import useFetch from "@/hooks/useFetch";
import { fetchAllQuizzes } from "@/services/quizzesService";
import { ClipLoader } from "react-spinners";
import c from "./quizzesPage.module.css";
import { Quiz } from "@/types/Quiz";
import { CategoryFilter, QuizCard } from "@/components";
import { useAuth } from "@/contexts";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Category } from "@/types/Category";
import { fetchAllCategories } from "@/services/categoryService";
import { Toaster } from "react-hot-toast";

export function QuizzesPage() {
  const { user } = useAuth();
  const { search } = useLocation();
  const [filteredData, setFilteredData] = useState<Quiz[]>([]);
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const {
    data: quizzes,
    isLoading: quizzesLoading,
    error: quizzesError,
  } = useFetch<Quiz[]>(fetchAllQuizzes);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useFetch<Category[]>(fetchAllCategories);

  useEffect(() => {
    if (quizzes) {
      const searchQuery = new URLSearchParams(search).get("search");
      const filteredQuizzes = quizzes.filter((quiz) => {
        const isMatch =
          !searchQuery ||
          quiz.name.toLowerCase().includes(searchQuery.toLowerCase());
        return isMatch && (!categoryId || quiz.category.id === categoryId);
      });
      setFilteredData(filteredQuizzes);
    }
  }, [quizzes, search, categoryId]);

  if (quizzesLoading || categoriesLoading) {
    return (
      <div className="loader">
        <ClipLoader size={100} color="#669e76" />
      </div>
    );
  }

  if (quizzesError || categoriesError)
    throw new Error(quizzesError ?? categoriesError ?? "Unknown error");

  return (
    <div className={`container headerPadding`}>
      <div className={c.header}>
        <div className={c.headerText}>
          <h1>
            {user ? (
              <>
                Welcome back,{" "}
                <span className={c.highlight}>{user.username} 👋</span>
              </>
            ) : (
              "Welcome to Dump Quiz!"
            )}
          </h1>
          <p>
            Test your knowledge and learn something new with our curated
            selection of quizzes. Browse through various topics, pick what
            interests you, and challenge yourself!
          </p>
        </div>
        {categories && (
          <CategoryFilter
            label="Filter by Category:"
            categories={categories}
            setCategory={setCategoryId}
          />
        )}
      </div>

      <div className={c.quizCardsWrapper}>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
        ) : (
          <div>
            {" "}
            <p className={c.noQuizzes}>No quizzes found.</p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

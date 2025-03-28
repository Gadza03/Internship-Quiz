import { Injectable } from '@nestjs/common';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizResultService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuizResultDto: CreateQuizResultDto) {
    return 'This action adds a new quizResult';
  }

  findAll() {
    return `This action returns all quizResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizResult`;
  }

  update(id: number, updateQuizResultDto: UpdateQuizResultDto) {
    return `This action updates a #${id} quizResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizResult`;
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// 2.0 Movies Controller 
// Express : 정보들이 자동으로 req 객체에 담겨있음. (req.query, req.body 등)
// Nest : If you want something, You have to ask for it.

@Controller('movies')
export class MoviesController {

    // Controller와 Service를 연결하는 방법
    // Service의 생성자를 만든다 ! 
    // 이 부분 덕분에 this.moviesService.getAll을 쓸 수 있게 된다.
    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    // search가 id 밑에 있으면 search를 id로 판단한다.
    // query string 형태로 받고싶다면? @Query
    @Get('search')
    search(@Query('year') searchingYear:string){
        return `We are searching for a movie made after: ${searchingYear}`;
    }

    @Get('/:id')
    getOne(@Param('id') movieId:string){
        // @ Param => url에 있는 id를 파라미터로 원해!
        return `This will return one movie with the id: ${movieId}`;
    }

    @Post()
    create(@Body() movieData){
        console.log(movieData);
        // const name = movieData.get('name');
        // console.log(name);
        return movieData;
        // return 'This will create a movie';
    }

    @Delete('/:id')
    remove(@Param('id') movieId:string){
        return `This will delete a movie:${movieId}`;
    }

    // update 대신 patch를 쓰는 이유 ? update는 모든 리소스가 업데이트 되기때문
    @Patch('/:id')
    path(@Param('id') movieId:string, @Body() updateData) {
        return {
            updatedMovie: movieId,
            ...updateData,
        };
    }



}


/*  #2.1 More Routes
Query는 Query Parameter를 받아올 때 사용하고,
(예, /users?id=123)
Param은 Path Variable을 받아올 때 사용합니다.
(예, /users/123)

Param은 요청 주소에 포함되어있는 변수를 담아요.
예를 들어서 localhost:3000/movie/4546 과 같은 주소가 있다면 4546을 담게 되고,

Query는 주소 이후에 "?" 뒤에 있는 변수를 담게 됩니다.
예를 들어서 localhost:3000/movie/search?year=2020일 경우에 2020을 담게 되는거에요!

추가적으로 Path Variable과 Query Parameter를 어떨때 사용하는지는 아래와 같이 사용하면 베스트라고 하네요.
만약 어떤 resource를 식별하고 싶으면 Path Variable을 사용하고,
정렬이나 필터링을 한다면 Query Parameter를 사용하는 것이 Best Practice이다.

 */
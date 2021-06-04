import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from 'src/pets/pet.entity';
import { PetsService } from 'src/pets/pets.service';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly petsService: PetsService,
  ) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @ResolveField((returns) => Pet)
  pets(@Parent() owner: Owner): Promise<Pet[]> {
    const { id } = owner;
    console.log(owner);
    return this.petsService.findByOwner(id);
  }

  //Create Query for Owner Pets

  // @Mutation(() => Owner)
  // updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
  //   return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  // } //Work on UpdateOwner

  // @Mutation(() => Owner)
  // removeOwner(@Args('id', { type: () => Int }) id: number) {
  //   return this.ownersService.remove(id);
  // }
}
